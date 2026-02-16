import { LeaderboardEntry, GameState } from "./types";
import { MAX_LEADERBOARD_ENTRIES } from "./constants";
import { supabase } from "./supabase";

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function parseTime(time: string): number {
  const parts = time.split(":");
  const min = parseInt(parts[0], 10) || 0;
  const sec = parseInt(parts[1], 10) || 0;
  return (min * 60 + sec) * 1000;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("SoR_Leaderboard")
    .select("*")
    .limit(MAX_LEADERBOARD_ENTRIES);

  if (error || !data) return [];

  const entries: LeaderboardEntry[] = data.map((row) => ({
    playerName: row.Name,
    completionTime: parseTime(row.Time || "0:00"),
    enemiesDefeated: row.Enemies ?? 0,
    moneyEarned: row.Coins ?? 0,
    itemsCollected: 0,
    finalRancorLevel: 0,
    finalHealthLevel: 0,
    won: row.Result === "WIN",
    timestamp: 0,
    endingReached: "",
  }));

  entries.sort((a, b) => {
    if (a.won !== b.won) return a.won ? -1 : 1;
    if (a.enemiesDefeated !== b.enemiesDefeated) return b.enemiesDefeated - a.enemiesDefeated;
    return a.completionTime - b.completionTime;
  });

  return entries;
}

export async function addLeaderboardEntry(entry: LeaderboardEntry): Promise<void> {
  await supabase.from("SoR_Leaderboard").insert({
    Name: entry.playerName,
    Result: entry.won ? "WIN" : "LOSS",
    Time: formatTime(entry.completionTime),
    Enemies: entry.enemiesDefeated,
    Coins: entry.moneyEarned,
  });
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
