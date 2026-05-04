/**
 * Lineup order + display helpers for event cards.
 * Headliners = first 3 slots in source data; then Take a Break crew; then everyone else.
 */

const CREW_MARKERS = [
  'misura',
  'moostatz',
  'lee kerry',
  'lakiluciano',
  'dj dras',
  'pipu',
  'pietro',
] as const;

const HEADLINER_PREFIX_LEN = 3;

function normalizeForCrewMatch(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isTakeABreakCrew(name: string): boolean {
  const n = normalizeForCrewMatch(name);
  if (!n) return false;
  if (n.includes('stenz')) return true;
  for (const m of CREW_MARKERS) {
    if (n === m || n.startsWith(`${m} `) || n.startsWith(`${m}:`) || n.startsWith(`${m}(`)) {
      return true;
    }
  }
  return false;
}

/**
 * Headliners keep the first N entries from the stored lineup, then all TAB crew from the remainder,
 * then other acts (original order within each group).
 */
export function sortLineupForDisplay(lineup: string[]): string[] {
  if (!lineup.length) return lineup;
  const n = Math.min(HEADLINER_PREFIX_LEN, lineup.length);
  const head = lineup.slice(0, n);
  const rest = lineup.slice(n);
  const crewInRest = rest.filter((x) => isTakeABreakCrew(x));
  const otherInRest = rest.filter((x) => !isTakeABreakCrew(x));
  return [...head, ...crewInRest, ...otherInRest];
}

export function formatLineupDisplayName(name: string): string {
  return name.toLocaleUpperCase('en-US');
}
