"use client";

import { LeaderboardEntry } from "../lib/types";

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  loading?: boolean;
  onClose: () => void;
}

export default function Leaderboard({ entries, loading, onClose }: LeaderboardProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 animate-fade-in">
      <h1 className="font-[family-name:var(--font-family-title)] text-xl text-cyan glow-cyan text-center mb-8">
        LEADERBOARD
      </h1>

      {loading ? (
        <div className="text-center py-12">
          <span className="font-[family-name:var(--font-family-title)] text-cyan text-sm animate-pulse">
            Loading...
          </span>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center text-muted py-12">
          <p className="text-4xl mb-4">🏆</p>
          <p className="font-[family-name:var(--font-family-title)] text-xs">
            No entries yet. Be the first!
          </p>
        </div>
      ) : (
        <div className="pixel-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-light font-[family-name:var(--font-family-title)] text-[9px] text-cyan">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-center">Result</th>
                <th className="p-3 text-right">Time</th>
                <th className="p-3 text-right">Enemies</th>
                <th className="p-3 text-right">Coins</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr
                  key={`${entry.playerName}-${entry.timestamp}`}
                  className={`border-t border-surface-light ${
                    entry.won ? "bg-cyan/5" : ""
                  }`}
                >
                  <td className="p-3 text-muted">{i + 1}</td>
                  <td className="p-3 font-bold">{entry.playerName}</td>
                  <td className="p-3 text-center">
                    {entry.won ? (
                      <span className="text-cyan">🏆 WIN</span>
                    ) : (
                      <span className="text-health-red">💀 LOSS</span>
                    )}
                  </td>
                  <td className="p-3 text-right text-gold">{formatTime(entry.completionTime)}</td>
                  <td className="p-3 text-right">{entry.enemiesDefeated}</td>
                  <td className="p-3 text-right text-gold">{entry.moneyEarned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-8">
        <button className="retro-btn choice-default rounded-lg" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
}
