"use client";

import { GameState, LeaderboardEntry } from "../lib/types";
import { StoryNode } from "../lib/types";

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

interface EndingScreenProps {
  state: GameState;
  node: StoryNode;
  entry: LeaderboardEntry;
  onRestart: () => void;
  onLeaderboard: () => void;
}

export default function EndingScreen({ state, node, entry, onRestart, onLeaderboard }: EndingScreenProps) {
  const won = node.endingType === "win";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className={`font-[family-name:var(--font-family-title)] text-2xl md:text-3xl mb-4 ${
            won ? "glow-cyan text-cyan" : "glow-pink text-pink"
          }`}
        >
          {won ? "VICTORY" : "GAME OVER"}
        </h1>
        <div className="text-5xl mb-4">{won ? "🏆" : "💀"}</div>
      </div>

      {/* Narrative */}
      <div className="pixel-border rounded-lg p-6 mb-8 bg-surface">
        <h2 className="font-[family-name:var(--font-family-title)] text-sm text-cyan mb-4">
          {node.title}
        </h2>
        <p className="whitespace-pre-line leading-relaxed">{node.narrative}</p>
        {node.loseReason && (
          <p className="mt-4 text-health-red font-[family-name:var(--font-family-title)] text-xs">
            {node.loseReason}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="pixel-border rounded-lg p-6 mb-8 bg-surface">
        <h2 className="font-[family-name:var(--font-family-title)] text-sm text-cyan mb-4 text-center">
          {state.playerName}&apos;s STATS
        </h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <StatBox label="Time" value={formatTime(entry.completionTime)} emoji="⏱️" />
          <StatBox label="Enemies" value={String(entry.enemiesDefeated)} emoji="⚔️" />
          <StatBox label="Coins" value={String(entry.moneyEarned)} emoji="💰" />
          <StatBox label="Items" value={String(entry.itemsCollected)} emoji="📦" />
          <StatBox
            label="Health"
            value={`${entry.finalHealthLevel}/100`}
            emoji="❤️"
            color={entry.finalHealthLevel > 50 ? "text-green-400" : "text-health-red"}
          />
          <StatBox
            label="Rancor"
            value={`${entry.finalRancorLevel}/100`}
            emoji="🗡️"
            color={entry.finalRancorLevel < 50 ? "text-green-400" : "text-rancor-glow"}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          className={`retro-btn ${won ? "choice-default" : "choice-combat"} rounded-lg`}
          onClick={onRestart}
        >
          {won ? "Play Again" : "Try Again"}
        </button>
        <button className="retro-btn choice-default rounded-lg" onClick={onLeaderboard}>
          Leaderboard
        </button>
      </div>

      {/* Cash App */}
      <div className="text-center mt-12 border-t border-surface-light pt-8">
        <p className="font-[family-name:var(--font-family-title)] text-[10px] text-muted mb-2">
          Enjoyed the game?
        </p>
        <a
          href="https://cash.app/$rileyroberson"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block retro-btn choice-default rounded-lg text-gold border-gold/50"
        >
          ☕ Buy me a coffee — $rileyroberson
        </a>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  emoji,
  color,
}: {
  label: string;
  value: string;
  emoji: string;
  color?: string;
}) {
  return (
    <div className="bg-bg/50 rounded-lg p-3">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className={`font-[family-name:var(--font-family-title)] text-sm ${color || "text-text"}`}>
        {value}
      </div>
      <div className="font-[family-name:var(--font-family-title)] text-[9px] text-muted mt-1">
        {label}
      </div>
    </div>
  );
}
