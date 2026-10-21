/**
 * Craviston Waffle Snake campaign constants.
 *
 * The same dates live in `public/config.js` for the game page. Keep both in
 * sync, or edit `public/config.js` after deploy without touching this file.
 * All timestamps are IST (+05:30).
 */

export const CAMPAIGN = {
  /** Path of the game page. Served from `public/` so it is a plain static file. */
  gameUrl: "/waffle-snake.html",
  start: "2026-10-21T00:00:00+05:30",
  end: "2026-11-07T23:59:59+05:30",
  results: "2026-11-08T00:00:00+05:30",
} as const;

export const CAMPAIGN_START = new Date(CAMPAIGN.start).getTime();
export const CAMPAIGN_END = new Date(CAMPAIGN.end).getTime();
export const CAMPAIGN_RESULTS = new Date(CAMPAIGN.results).getTime();

export type CampaignPhase = "upcoming" | "live" | "closed" | "announced";

export function getCampaignPhase(now: number): CampaignPhase {
  if (now < CAMPAIGN_START) return "upcoming";
  if (now < CAMPAIGN_END) return "live";
  if (now < CAMPAIGN_RESULTS) return "closed";
  return "announced";
}
