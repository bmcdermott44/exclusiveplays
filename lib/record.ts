// Bret's live record, read from Nexfuse. Shared by the page AND the page metadata so the two can
// never disagree -- the description said "36% win rate, up 28 units" while the page itself had
// already been corrected to 37.8% and +50, which is exactly how a stale claim survives a fix.
//
// get_user_pick_stats is the same function the Nexfuse app reads, callable with the publishable
// key. It already excludes challenge picks, preseason picks and market parlays; recounting by hand
// means keeping a copy of those rules in sync forever.

// Read live from Nexfuse instead of retyping. These numbers ARE the pitch, so a stale figure is
// not a cosmetic problem: by 2026-09-02 the hardcoded set below was understating him badly --
// +28.12u at +12.6% when he was actually at +50.01u and +18.0%.
//
// get_user_pick_stats is the same function the Nexfuse app reads, callable with the publishable
// key. It already excludes challenge picks, preseason picks and market parlays, which is why this
// does not recount picks by hand: a copy of those rules drifts the moment one of them changes.
const NEXFUSE_URL = "https://iavgrxtcptwyuvbqtalf.supabase.co";
const NEXFUSE_KEY = "sb_publishable_6GyAJ78iLC3BStZMEylA_g_V_V1fMkp";
const NEXFUSE_USER = "bretmcdermott";

// Last known good. Shown only if Nexfuse is unreachable at build/render time -- a hiccup there
// must degrade to slightly-old numbers, never to a blank page or a zero.
const FALLBACK = {
  picks: 280, wins: 105, losses: 173, pushes: 2,
  winRate: "37.8%", units: "+50.01", roi: "+18.0%",
};

const RECORD_STATIC = {
  since: "May 2026",
  profile: `https://getnexfuse.com/u/${NEXFUSE_USER}`,
};

export async function getRecord() {
  try {
    const h = { apikey: NEXFUSE_KEY, "Content-Type": "application/json" };
    const pr = await fetch(
      `${NEXFUSE_URL}/rest/v1/profiles?username=eq.${NEXFUSE_USER}&select=id`,
      { headers: h, next: { revalidate: 900 } },
    );
    const id = (await pr.json())?.[0]?.id;
    if (!id) return FALLBACK;

    const sr = await fetch(`${NEXFUSE_URL}/rest/v1/rpc/get_user_pick_stats`, {
      method: "POST", headers: h, body: JSON.stringify({ p_user_id: id }),
      next: { revalidate: 900 },
    });
    const st = await sr.json();
    const rec = st?.sports_overall;
    if (!rec || rec.wins == null) return FALLBACK;

    const wins = Number(rec.wins), losses = Number(rec.losses), pushes = Number(rec.pushes ?? 0);
    const units = Number(st.units_sports ?? 0);
    return {
      picks: wins + losses + pushes,
      wins, losses, pushes,
      winRate: rec.win_pct != null ? `${Number(rec.win_pct).toFixed(1)}%` : FALLBACK.winRate,
      units: `${units >= 0 ? "+" : ""}${units.toFixed(2)}`,
      roi: rec.roi != null ? `${Number(rec.roi) >= 0 ? "+" : ""}${Number(rec.roi).toFixed(1)}%` : FALLBACK.roi,
    };
  } catch {
    return FALLBACK;
  }
}


export const RECORD_STATIC_EXPORT = RECORD_STATIC;
