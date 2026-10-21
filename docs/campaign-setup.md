# Craviston Waffle Snake - Campaign Setup

Everything needed to put the Waffle Snake campaign live: Google sign-in, a shared
leaderboard, the deadline behaviour, and the winner handover.

**Timeline**

| What | When |
| --- | --- |
| Contest opens | 21 Oct 2026, 00:00 IST |
| Contest closes | 7 Nov 2026, 23:59 IST |
| Winner announced | 8 Nov 2026 |
| Prize redeemed by | 30 Nov 2026 |

---

## 1. What is where

| Path | Purpose |
| --- | --- |
| `public/waffle-snake.html` | The game. Self-contained page, no build step. |
| `public/config.js` | Firebase + campaign config. Edit after deploy, no rebuild. |
| `src/components/CampaignBanner.tsx` | The banner at the top of the homepage. |
| `firestore.rules` | Leaderboard security rules. |
| `firestore.indexes.json` | Firestore index config. |
| `firebase.json` | Firebase CLI config for rules + functions. |
| `functions/` | Optional hardened score submission (Cloud Function). |

---

## 2. Create the Firebase project

If you already have a Firebase project for the website, reuse it. Otherwise:

1. Go to <https://console.firebase.google.com> and click **Add project**.
2. Name it `craviston-campaign` (or anything you like), Google Analytics off.
3. Once created, open the **Web** icon (`</>`) to register a web app.
   - Firebase App Hosting sites get one automatically, but registering your own
     web app gives you a clean config you can paste into `config.js`.
   - Do **not** tick "Firebase Hosting" - the site itself is hosted on App Hosting.

---

## 3. Turn on Google sign-in

1. **Build > Authentication > Get started**.
2. **Sign-in method > Google > Enable**.
3. Set a support email, click **Save**.
4. **Authorized domains** tab: add every domain the game will run on.
   - `craviston.in`
   - `www.craviston.in`
   - `localhost` (already there by default - useful for testing)

> The game opens a Google popup. It falls back to a full-page redirect if the
> popup is blocked. Inside the Instagram or Facebook in-app browser Google
> refuses to sign in at all, so the game shows a banner telling players to open
> the page in Chrome or Safari. Always post campaign links as a normal link,
> never as an in-app "Open in Instagram" deep link.

---

## 4. Create the Firestore database

1. **Build > Firestore Database > Create database**.
2. Pick a region close to Mumbai (`asia-south1` / Mumbai if available).
3. Choose **Start in production mode**. The rules in `firestore.rules` are
   deployed in step 5 and are what actually protect the data.
4. Keep the two default collections. You do not need to create them by hand -
   they are created on the first score.

---

## 5. Deploy the security rules

```bash
npm install -g firebase-tools
firebase login
firebase use --add          # pick the project you created in step 2
firebase deploy --only firestore:rules,firestore:indexes
```

Rules summary:

- `scores/{uid}` is world-readable (that is the leaderboard).
- A player can write only their own document.
- A score can go **up** but never down, and never above `5000`.
- Scores cannot be deleted, so a tie can be broken by who reached the score first.
- `players/{uid}` is private to its owner.

---

## 6. Paste the Firebase config

Open the **Web app** you registered in step 2 and copy the `firebaseConfig`
object. Paste it into `public/config.js`:

```js
window.CRAVISTON_CONFIG = {
  firebase: {
    apiKey: 'AIza...',
    authDomain: 'craviston-campaign.firebaseapp.com',
    projectId: 'craviston-campaign',
    appId: '1:1234567890:web:abcdef'
  },
  // ...rest unchanged
};
```

`config.js` is a static file. After the site is deployed you can edit it in
Firebase App Hosting's file viewer (or via any CDN you use) and the change goes
live on the next reload - **no rebuild required**.

> The game requests `config.js` with a cache-busting query string, so a change
> is picked up on the very next page load. There is no version number to bump
> and no stale-cache trap. If the demo banner is still showing after a config
> change, hard-reload once (Ctrl+Shift+R) to clear the page itself from cache.

> Keep `public/config.js` in the repo in sync with what is live on the server.
> A redeploy overwrites `config.js` with the committed copy, so a stale
> committed copy would silently put the game back into demo mode.

While `firebase.apiKey` is empty the game stays in **demo mode**: sign-in is a
name prompt and scores live only in that browser's localStorage.

---

## 7. Deploy the website

```bash
npm run build
```

`next build` writes the static site to `out/`. `out/waffle-snake.html` and
`out/config.js` are included automatically because they live in `public/`.

Then deploy `out/` to Firebase App Hosting (or whichever host you use).

Live game URL: **https://craviston.in/waffle-snake.html**
Homepage banner links here.

---

## 8. Optional: hardened score submission

The rules in step 5 stop a player from lowering their score, editing someone
else's score, or deleting entries. They do **not** stop a player from writing
an inflated score directly from the browser console. The rules cannot see how
the number was produced.

The `functions/` folder adds a Cloud Function that receives the score on the
server, validates it, rate limits the account, and writes an audit trail. This
gives you a log of every score claim to review before you announce a winner.

**This needs the Blaze (pay as you go) plan** - Cloud Functions always require
a billing account. If you are on the Spark plan, skip this and rely on the
rules plus the manual review described in step 10.

```bash
cd functions
npm install
npm run deploy
```

Copy the printed function URL into `public/config.js`:

```js
functionsUrl: 'https://asia-south1-<project>.cloudfunctions.net/submitScore',
```

The game detects `functionsUrl` and posts scores to the function instead of
writing to Firestore directly.

---

## 9. Test before you launch

| Check | How |
| --- | --- |
| Game loads | Open `/waffle-snake.html`. The board renders, no red console errors. |
| Sign-in | Click **Sign in with Google**. The name appears in the top bar. |
| Location | Click **Check location**. The chip turns green and shows the distance. |
| Score saves | Play, eat a waffle, die. The note says "New best. Your score is on the board." |
| Leaderboard | Your masked name appears on the board with your score. |
| Banner | Open `/`. The banner is at the top; clicking it opens the game in a new tab. |
| Countdown | The banner shows a live countdown to 7 Nov. |
| Mobile | Test on a real phone. Swipe to steer. The score row stays visible. |
| Incognito | The demo banner should be **hidden**, and sign-in should still work. |
| In-app browser | Open the link inside Instagram. The "open in Chrome" notice appears. |

---

## 10. Running the campaign

**During the contest (21 Oct - 7 Nov)**

- The banner on the homepage counts down automatically and the game shows
  "Contest ends in ...".
- After 7 Nov 23:59 IST the game flips to "Contest closed" and the banner
  switches to "Contest closed - winner announced 8 Nov". No code change needed.
- Scores stop counting once the deadline passes. The server-side function
  also refuses submissions after the deadline, so nobody can bank a score late.

**Picking the winner (8 Nov)**

1. Open the `scores` collection in the Firebase console, sorted by `score`
   descending.
2. If you deployed the function, also open `scoreAudit` and check for
   anything odd - the same account submitting repeatedly, a spike of very high
   scores, or several accounts from one device.
3. Ties are broken by `achievedAt`: whoever reached the score first wins.
4. Announce the winner on Instagram and Facebook. The leaderboard already
   shows a "Winner" tag once the results date has passed.

**Handing over the prize**

The winner orders their waffle on Zomato (Craviston), then you refund the
waffle's item price. Shipping, platform fees, taxes and packaging stay with
the customer - the terms on the game page spell this out. Confirm the
refund method and timing when you contact the winner, and note the 3-day
response window and the 30 Nov redemption deadline.

---

## 11. Known limits, read before you announce a winner

- **One entry per Google account.** The rules enforce one document per
  account, not one account per human. The terms disqualify multi-account
  play; enforcement is manual.
- **Scores are client-generated.** Even with the Cloud Function, the number
  arrives from the player's browser. Review the top few before announcing.
- **Location is device-reported.** The 10 km check uses the browser's
  geolocation, which a determined player can spoof. It filters casual
  out-of-area players; it is not a guarantee.
- **No email is sent to players.** Only the winner is contacted, on the email
  attached to their Google account.
