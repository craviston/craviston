/* ==========================================================================
   CRAVISTON CAMPAIGN CONFIG
   --------------------------------------------------------------------------
   This file is served as-is from the deployed site. Edit it on the server
   and reload the page - no rebuild, no redeploy of the Next.js app required.

   The game loads this file with a cache-busting query string, so a change
   here is picked up on the very next page load. Nothing else to bump.

   While `firebase.apiKey` is empty the game runs in DEMO mode:
   sign-in is simulated with a name prompt and scores are stored only in
   this browser's localStorage. The leaderboard is not shared.
   ========================================================================== */

window.CRAVISTON_CONFIG = {
  firebase: {
    // From Firebase console > Project settings > General > Your apps > Web app
    // (the SDK setup snippet starts with "const firebaseConfig = {")
    // A Firebase web API key is a public client identifier, not a secret -
    // it ships in every browser. Access is controlled by firestore.rules.
    apiKey: 'AIzaSyBVT0v3-LfKdUR3k6fvlCNWO-c_lf3mtGo',
    authDomain: 'craviston-snake.firebaseapp.com',
    projectId: 'craviston-snake',
    appId: '1:124904832835:web:2481b569716371c1c179f6'
  },

  // The kitchen players must be near. Scored games only count inside radiusKm.
  outlet: { lat: 19.159025, lng: 73.077988 },
  radiusKm: 10,

  // All timestamps are IST (+05:30).
  campaign: {
    start: '2026-10-21T00:00:00+05:30',
    end: '2026-11-07T23:59:59+05:30',
    results: '2026-11-08T00:00:00+05:30'
  },

  orderUrl: 'https://craviston.in',

  // Optional. URL of the hardened Cloud Function from the functions/ folder.
  // Leave empty to let the game write straight to Firestore under the
  // security rules in firestore.rules.
  // Example: 'https://asia-south1-<project>.cloudfunctions.net/submitScore'
  functionsUrl: '',

  shareText: 'I am playing Craviston Waffle Snake. Beat my score and win a free waffle!'
};
