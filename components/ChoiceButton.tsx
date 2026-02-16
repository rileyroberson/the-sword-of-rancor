"use client";

import { Choice } from "../lib/types";

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  locked: boolean;
  lockReason?: string;
  onClick: () => void;
}

export default function ChoiceButton({ choice, index, locked, lockReason, onClick }: ChoiceButtonProps) {
  const styleClass = locked
    ? "choice-locked"
    : choice.usesSword
      ? "choice-sword"
      : choice.isCombat
        ? "choice-combat"
        : "choice-default";

  const icon = locked
    ? "🔒"
    : choice.usesSword
      ? "⚔️"
      : choice.isCombat
        ? "🗡️"
        : choice.isHighRisk
          ? "💀"
          : `${index + 1}.`;

  return (
    <button
      className={`retro-btn ${styleClass} w-full text-left rounded-lg animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      disabled={locked}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 mt-0.5">{icon}</span>
        <div className="flex-1">
          <div className="font-[family-name:var(--font-family-body)] text-lg leading-tight">
            {choice.text}
          </div>
          {choice.preview && !locked && (
            <div className="mt-1 text-[11px] font-[family-name:var(--font-family-title)] opacity-50 italic">
              {choice.preview}
            </div>
          )}
          {locked && lockReason && (
            <div className="mt-1 text-[11px] font-[family-name:var(--font-family-title)] text-yellow/60">
              {lockReason}
            </div>
          )}
          {choice.usesSword && !locked && (
            <div className="mt-1 text-[10px] font-[family-name:var(--font-family-title)] text-rancor-glow/70">
              +{15} Rancor
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
