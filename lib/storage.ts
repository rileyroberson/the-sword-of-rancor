import { GameState, SaveData } from "./types";

const SAVE_KEY = "sword-of-rancor-save";

export function saveGame(state: GameState): void {
  if (typeof window === "undefined") return;
  const saveData: SaveData = {
    gameState: state,
    lastSaved: Date.now(),
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

export function loadGame(): SaveData | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(SAVE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function deleteSave(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SAVE_KEY);
}
