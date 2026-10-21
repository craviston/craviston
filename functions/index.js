/**
 * Craviston Waffle Snake - optional hardened score submission.
 *
 * This function is OPTIONAL. With it enabled, the game stops writing to
 * Firestore directly and posts the score here instead. That gives you:
 *   - a server-side audit trail of every score claim
 *   - rate limiting, so one account cannot spam the board
 *   - a single place to add a manual review step before announcing a winner
 *
 * To enable it:
 *   1. npm install && npm run deploy  (inside this folder)
 *   2. Put the printed function URL into public/config.js as
 *        functionsUrl: 'https://<region>-<project>.cloudfunctions.net/submitScore'
 *   3. Bump the ?v=1 query string in public/waffle-snake.html
 *
 * Deploying this needs the Blaze (pay as you go) plan, because Cloud
 * Functions always require a billing account. If you are on the Spark plan,
 * skip this folder and rely on firestore.rules alone.
 */

const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue, Timestamp } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
const { logger } = require("firebase-functions");

initializeApp();

const db = getFirestore();
const auth = getAuth();

// Keep these in sync with public/config.js.
const CAMPAIGN = {
  start: Date.parse("2026-10-21T00:00:00+05:30"),
  end: Date.parse("2026-11-07T23:59:59+05:30"),
};

const MAX_SCORE = 5000;
const POINTS_PER_WAFFLE = 10;
const MAX_SUBMISSIONS_PER_MINUTE = 12;

function cors(req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return true;
  }
  return false;
}

function maskName(full) {
  const parts = String(full || "Player").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "Player";
  const first = parts[0].slice(0, 14);
  return parts.length > 1
    ? first + " " + parts[parts.length - 1][0].toUpperCase() + "."
    : first;
}

exports.submitScore = onRequest(async (req, res) => {
  if (cors(req, res)) return;

  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return res.status(401).json({ error: "missing_token" });
  }

  let decoded;
  try {
    decoded = await auth.verifyIdToken(token);
  } catch (err) {
    logger.warn("bad id token", err);
    return res.status(401).json({ error: "invalid_token" });
  }

  const uid = decoded.uid;
  const now = Date.now();

  if (now < CAMPAIGN.start) {
    return res.status(403).json({ error: "campaign_not_started" });
  }
  if (now > CAMPAIGN.end) {
    return res.status(403).json({ error: "campaign_closed" });
  }

  const score = Number(req.body && req.body.score);
  if (!Number.isInteger(score) || score < POINTS_PER_WAFFLE || score > MAX_SCORE) {
    return res.status(400).json({ error: "invalid_score" });
  }
  if (score % POINTS_PER_WAFFLE !== 0) {
    return res.status(400).json({ error: "invalid_score" });
  }

  // Rate limit: 12 submissions per minute per account.
  const rlRef = db.doc(`rateLimits/${uid}`);
  let rl;
  try {
    rl = await rlRef.get();
  } catch (err) {
    logger.error("rate limit read failed", err);
    return res.status(500).json({ error: "server_error" });
  }
  const windowStart = now - 60_000;
  const recent = (rl.exists && rl.data().windowStart >= windowStart ? rl.data().count : 0) + 1;
  if (recent > MAX_SUBMISSIONS_PER_MINUTE) {
    return res.status(429).json({ error: "too_many_requests" });
  }
  await rlRef.set(
    { windowStart: now, count: recent, updatedAt: FieldValue.serverTimestamp() },
    { merge: true }
  );

  const ref = db.doc(`scores/${uid}`);
  const snap = await ref.get();
  const previous = snap.exists ? snap.data().score : 0;

  if (previous >= score) {
    return res.status(200).json({ ok: true, improved: false, score: previous });
  }

  const name = maskName(decoded.name);
  await ref.set({
    uid,
    name,
    score,
    achievedAt: Timestamp.fromMillis(now),
    email: decoded.email || "",
    submittedVia: "function",
  });

  // Audit trail - review this before announcing the winner.
  await db.doc(`scoreAudit/${uid}_${now}`).set({
    uid,
    name,
    email: decoded.email || "",
    score,
    previousScore: previous,
    ip: req.ip || "",
    userAgent: req.get("user-agent") || "",
    at: Timestamp.fromMillis(now),
  });

  logger.info("score accepted", { uid, score, previous });

  return res.status(200).json({ ok: true, improved: true, score });
});
