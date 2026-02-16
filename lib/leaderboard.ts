import { LeaderboardEntry, GameState } from "./types";
import { MAX_LEADERBOARD_ENTRIES } from "./constants";

const LEADERBOARD_KEY = "sword-of-rancor-leaderboard";

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(LEADERBOARD_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addLeaderboardEntry(entry: LeaderboardEntry): void {
  if (typeof window === "undefined") return;
  const leaderboard = getLeaderboard();
  leaderboard.push(entry);
  leaderboard.sort((a, b) => {
    if (a.won !== b.won) return a.won ? -1 : 1;
    return a.completionTime - b.completionTime;
  });
  const trimmed = leaderboard.slice(0, MAX_LEADERBOARD_ENTRIES);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
}

export function buildLeaderboardEntry(state: GameState, won: boolean): LeaderboardEntry {
  return {
    playerName: state.playerName,
    completionTime: Date.now() - state.startTime,
    enemiesDefeated: state.enemiesDefeated,
    moneyEarned: state.money,
    itemsCollected: state.inventory.length,
    finalRancorLevel: state.rancor,
    finalHealthLevel: state.health,
    won,
    timestamp: Date.now(),
    endingReached: state.currentNodeId,
  };
}
