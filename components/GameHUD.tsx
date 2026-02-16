"use client";

import { GameState } from "../lib/types";

export default function GameHUD({ state }: { state: GameState }) {
  const healthPct = Math.max(0, Math.min(100, (state.health / state.maxHealth) * 100));
  const rancorPct = Math.max(0, Math.min(100, state.rancor));

  const healthColor =
    healthPct > 60 ? "bg-green-500" : healthPct > 30 ? "bg-yellow-500" : "bg-health-red";
  const rancorColor = rancorPct > 70 ? "bg-pink" : "bg-rancor-purple";

  return (
    <div className="sticky top-0 z-50 bg-bg/95 border-b-2 border-surface-light px-4 py-3">
      <div className="mx-auto max-w-3xl flex flex-wrap items-center gap-x-6 gap-y-2">
        {/* Health */}
        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <span className="font-[family-name:var(--font-family-title)] text-[10px] text-health-red">
            HP
          </span>
          <div className="relative h-4 flex-1 bg-surface rounded overflow-hidden border border-health-red/40">
            <div
              className={`h-full ${healthColor} bar-segments transition-all duration-500`}
              style={{ width: `${healthPct}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
              {state.health}/{state.maxHealth}
            </span>
          </div>
        </div>

        {/* Rancor */}
        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <span className="font-[family-name:var(--font-family-title)] text-[10px] text-rancor-glow">
            ⚔️
          </span>
          <div
            className={`relative h-4 flex-1 bg-surface rounded overflow-hidden border border-rancor-purple/40 ${
              rancorPct > 70 ? "glow-rancor" : ""
            }`}
          >
            <div
              className={`h-full ${rancorColor} bar-segments transition-all duration-500 ${
                rancorPct > 70 ? "animate-[rancor-pulse_1s_ease-in-out_infinite]" : ""
              }`}
              style={{ width: `${rancorPct}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
              {state.rancor}/100
            </span>
          </div>
        </div>

        {/* Money */}
        <div className="flex items-center gap-1">
          <span className="text-gold text-lg">💰</span>
          <span className="font-[family-name:var(--font-family-title)] text-[11px] text-gold">
            {state.money}
          </span>
        </div>

        {/* Items */}
        <div className="flex items-center gap-1">
          {state.inventory.length === 0 ? (
            <span className="text-muted text-sm">No items</span>
          ) : (
            state.inventory.map((item) => (
              <span key={item.id} title={`${item.name}: ${item.description}`} className="text-lg cursor-help">
                {item.emoji}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
