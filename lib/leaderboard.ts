import { LeaderboardEntry, GameState } from "./types";
import { MAX_LEADERBOARD_ENTRIES } from "./constants";
import { supabase } from "./supabase";

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("SoR_Leaderboard")
    .select("*")
    .order("won", { ascending: false })
    .order("enemies_defeated", { ascending: false })
    .order("completion_time", { ascending: true })
    .limit(MAX_LEADERBOARD_ENTRIES);

  if (error || !data) return [];

  return data.map((row) => ({
    playerName: row.player_name,
    completionTime: row.completion_time,
    enemiesDefeated: row.enemies_defeated,
    moneyEarned: row.money_earned,
    itemsCollected: row.items_collected,
    finalRancorLevel: row.final_rancor,
    finalHealthLevel: row.final_health,
    won: row.won,
    timestamp: new Date(row.created_at).getTime(),
    endingReached: row.ending_reached,
  }));
}

export async function addLeaderboardEntry(entry: LeaderboardEntry): Promise<void> {
  await supabase.from("SoR_Leaderboard").insert({
    player_name: entry.playerName,
    won: entry.won,
    completion_time: entry.completionTime,
    enemies_defeated: entry.enemiesDefeated,
    money_earned: entry.moneyEarned,
    items_collected: entry.itemsCollected,
    final_rancor: entry.finalRancorLevel,
    final_health: entry.finalHealthLevel,
    ending_reached: entry.endingReached,
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
