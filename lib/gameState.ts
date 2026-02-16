import { GameState, Choice, InventoryItem } from "./types";
import { STARTING_HEALTH, STARTING_MONEY, MAX_HEALTH, MAX_RANCOR, SWORD_RANCOR_PER_USE } from "./constants";

export function initializeGame(playerName: string): GameState {
  return {
    playerName,
    currentNodeId: "start",
    health: STARTING_HEALTH,
    maxHealth: MAX_HEALTH,
    rancor: 0,
    money: STARTING_MONEY,
    inventory: [],
    enemiesDefeated: 0,
    startTime: Date.now(),
    gameActive: true,
    visitedNodes: ["start"],
  };
}

export function applyChoiceEffects(state: GameState, choice: Choice): GameState {
  const newState: GameState = {
    ...state,
    inventory: [...state.inventory],
    visitedNodes: [...state.visitedNodes],
  };

  if (choice.healthChange) {
    newState.health = Math.max(0, Math.min(MAX_HEALTH, state.health + choice.healthChange));
  }

  if (choice.usesSword) {
    newState.rancor = Math.min(MAX_RANCOR, state.rancor + SWORD_RANCOR_PER_USE);
  } else if (choice.rancorChange) {
    newState.rancor = Math.max(0, Math.min(MAX_RANCOR, state.rancor + choice.rancorChange));
  }

  if (choice.moneyChange) {
    newState.money = Math.max(0, state.money + choice.moneyChange);
  }

  if (choice.itemsGained) {
    for (const item of choice.itemsGained) {
      const existing = newState.inventory.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        newState.inventory.push({ ...item });
      }
    }
  }

  if (choice.itemsLost) {
    newState.inventory = newState.inventory.filter((i) => !choice.itemsLost!.includes(i.id));
  }

  if (choice.enemyDefeated) {
    newState.enemiesDefeated += 1;
  }

  newState.currentNodeId = choice.nextNodeId;
  newState.visitedNodes.push(choice.nextNodeId);

  if (newState.health <= 0 || newState.rancor >= MAX_RANCOR) {
    newState.gameActive = false;
  }

  return newState;
}

export function canSelectChoice(state: GameState, choice: Choice): { allowed: boolean; reason?: string } {
  if (choice.requiresItem) {
    if (!state.inventory.find((item) => item.id === choice.requiresItem)) {
      return { allowed: false, reason: `Requires: ${choice.requiresItem.replace(/_/g, " ")}` };
    }
  }

  if (choice.requiresMoney && state.money < choice.requiresMoney) {
    return { allowed: false, reason: `Requires ${choice.requiresMoney} coins` };
  }

  if (choice.requiresMinHealth && state.health < choice.requiresMinHealth) {
    return { allowed: false, reason: `Requires at least ${choice.requiresMinHealth} HP` };
  }

  return { allowed: true };
}
