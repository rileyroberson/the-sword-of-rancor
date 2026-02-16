"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isNameAppropriate } from "../lib/nameFilter";
import { initializeGame } from "../lib/gameState";
import { saveGame, loadGame, deleteSave } from "../lib/storage";
import { getLeaderboard } from "../lib/leaderboard";
import Leaderboard from "../components/Leaderboard";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [hasSave, setHasSave] = useState(false);
  const [savedName, setSavedName] = useState("");
  const [view, setView] = useState<"home" | "leaderboard">("home");
  const [mounted, setMounted] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setMounted(true);
    const save = loadGame();
    if (save?.gameState) {
      setHasSave(true);
      setSavedName(save.gameState.playerName);
    }
  }, []);

  const handleNewGame = async () => {
    if (checking) return;
    setChecking(true);
    try {
      const check = await isNameAppropriate(name);
      if (!check.valid) {
        setError(check.message || "Invalid name");
        return;
      }
      setError("");
      const state = initializeGame(name.trim());
      saveGame(state);
      router.push("/story/start");
    } finally {
      setChecking(false);
    }
  };

  const handleContinue = () => {
    const save = loadGame();
    if (save?.gameState) {
      router.push(`/story/${save.gameState.currentNodeId}`);
    }
  };

  const handleDeleteSave = () => {
    deleteSave();
    setHasSave(false);
    setSavedName("");
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="font-[family-name:var(--font-family-title)] text-cyan text-sm animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  if (view === "leaderboard") {
    return <Leaderboard entries={getLeaderboard()} onClose={() => setView("home")} />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-lg w-full text-center animate-fade-in">
        <h1 className="font-[family-name:var(--font-family-title)] text-2xl md:text-3xl title-shimmer mb-2 leading-relaxed">
          THE SWORD
        </h1>
        <h1 className="font-[family-name:var(--font-family-title)] text-2xl md:text-3xl title-shimmer mb-6 leading-relaxed">
          OF RANCOR
        </h1>
        <p className="text-5xl mb-6">⚔️</p>
        <p className="text-muted mb-10 max-w-md mx-auto">
          A cursed blade. A perilous journey. Return the sword to the Mines of the Maker
          before it consumes your soul.
        </p>

        {hasSave && (
          <div className="mb-8 p-4 bg-surface rounded-lg border border-surface-light">
            <p className="font-[family-name:var(--font-family-title)] text-[10px] text-muted mb-3">
              Saved game found
            </p>
            <p className="text-cyan mb-3">{savedName}</p>
            <div className="flex gap-3 justify-center">
              <button className="retro-btn choice-default rounded-lg" onClick={handleContinue}>
                Continue
              </button>
              <button className="retro-btn choice-combat rounded-lg" onClick={handleDeleteSave}>
                Delete
              </button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <label className="block font-[family-name:var(--font-family-title)] text-[10px] text-muted mb-3">
            Enter your name, adventurer
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleNewGame()}
            placeholder="Your name..."
            maxLength={20}
            className="w-full bg-surface border-2 border-surface-light rounded-lg px-4 py-3 text-center text-cyan font-[family-name:var(--font-family-body)] text-xl outline-none focus:border-cyan transition-colors"
          />
          {error && (
            <p className="mt-2 text-health-red font-[family-name:var(--font-family-title)] text-[10px]">
              {error}
            </p>
          )}
          <button
            className="retro-btn choice-default rounded-lg mt-4 w-full"
            onClick={handleNewGame}
            disabled={checking}
          >
            {checking ? "Checking..." : "New Game"}
          </button>
        </div>

        <button
          className="font-[family-name:var(--font-family-title)] text-[10px] text-muted hover:text-cyan transition-colors"
          onClick={() => setView("leaderboard")}
        >
          🏆 Leaderboard
        </button>
      </div>
    </main>
  );
}
