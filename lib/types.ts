export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  quantity: number;
  consumable: boolean;
}

export interface Choice {
  text: string;
  preview?: string;
  nextNodeId: string;
  requiresItem?: string;
  requiresMoney?: number;
  requiresMinHealth?: number;
  healthChange?: number;
  rancorChange?: number;
  moneyChange?: number;
  itemsGained?: InventoryItem[];
  itemsLost?: string[];
  enemyDefeated?: boolean;
  usesSword?: boolean;
  isCombat?: boolean;
  isHighRisk?: boolean;
}

export interface StoryNode {
  id: string;
  title: string;
  narrative: string;
  choices: Choice[];
  isEnding?: boolean;
  endingType?: "win" | "lose";
  loseReason?: string;
}

export interface GameState {
  playerName: string;
  currentNodeId: string;
  health: number;
  maxHealth: number;
  rancor: number;
  money: number;
  inventory: InventoryItem[];
  enemiesDefeated: number;
  startTime: number;
  gameActive: boolean;
  visitedNodes: string[];
}

export interface LeaderboardEntry {
  playerName: string;
  completionTime: number;
  enemiesDefeated: number;
  moneyEarned: number;
  itemsCollected: number;
  finalRancorLevel: number;
  finalHealthLevel: number;
  won: boolean;
  timestamp: number;
  endingReached: string;
}

export interface SaveData {
  gameState: GameState;
  lastSaved: number;
}
