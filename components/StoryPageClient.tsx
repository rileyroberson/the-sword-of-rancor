"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { GameState, LeaderboardEntry } from "../lib/types";
import { getStoryNode } from "../lib/storyData";
import { applyChoiceEffects, canSelectChoice } from "../lib/gameState";
import { saveGame, loadGame, deleteSave } from "../lib/storage";
import { addLeaderboardEntry, buildLeaderboardEntry, getLeaderboard } from "../lib/leaderboard";
import GameHUD from "./GameHUD";
import ChoiceButton from "./ChoiceButton";
import EndingScreen from "./EndingScreen";
import Leaderboard from "./Leaderboard";

export default function StoryPageClient({ nodeId }: { nodeId: string }) {
  const router = useRouter();
  const [state, setState] = useState<GameState | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [endingRecorded, setEndingRecorded] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  useEffect(() => {
    const save = loadGame();
    if (save && save.gameState) {
      const s = { ...save.gameState, currentNodeId: nodeId };
      setState(s);
    } else {
      router.push("/");
    }
  }, [nodeId, router]);

  // Disable browser back button during gameplay
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleChoice = useCallback(
    (choiceIndex: number) => {
      if (!state) return;
      const node = getStoryNode(state.currentNodeId);
      if (!node) return;
      const choice = node.choices[choiceIndex];
      if (!choice) return;

      const { allowed } = canSelectChoice(state, choice);
      if (!allowed) return;

      const newState = applyChoiceEffects(state, choice);

      const nextNode = getStoryNode(newState.currentNodeId);
      let redirectNodeId = newState.currentNodeId;

      if (newState.rancor >= 100) {
        redirectNodeId = "lose_rancor";
        newState.currentNodeId = redirectNodeId;
        newState.gameActive = false;
      } else if (newState.health <= 0) {
        redirectNodeId = "lose_health";
        newState.currentNodeId = redirectNodeId;
        newState.gameActive = false;
      } else if (nextNode?.isEnding) {
        newState.gameActive = false;
      }

      setState(newState);
      saveGame(newState);
      router.push(`/story/${redirectNodeId}`);
    },
    [state, router]
  );

  const handleRestart = useCallback(() => {
    deleteSave();
    router.push("/");
  }, [router]);

  // Record ending to Supabase
  useEffect(() => {
    if (!state || endingRecorded) return;
    const node = getStoryNode(nodeId);
    if (!node?.isEnding) return;

    const won = node.endingType === "win";
    const entry = buildLeaderboardEntry(state, won);
    setEndingRecorded(true);
    addLeaderboardEntry(entry);
  }, [state, nodeId, endingRecorded]);

  const handleShowLeaderboard = useCallback(async () => {
    setLoadingLeaderboard(true);
    setShowLeaderboard(true);
    const entries = await getLeaderboard();
    setLeaderboardEntries(entries);
    setLoadingLeaderboard(false);
  }, []);

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="font-[family-name:var(--font-family-title)] text-cyan text-sm animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  const node = getStoryNode(nodeId);

  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="font-[family-name:var(--font-family-title)] text-health-red text-sm">
          Path not found
        </p>
        <button className="retro-btn choice-default rounded-lg" onClick={handleRestart}>
          Start Over
        </button>
      </div>
    );
  }

  // Ending screen
  if (node.isEnding) {
    if (showLeaderboard) {
      return (
        <Leaderboard
          entries={leaderboardEntries}
          loading={loadingLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
      );
    }

    const entry = buildLeaderboardEntry(state, node.endingType === "win");
    return (
      <EndingScreen
        state={state}
        node={node}
        entry={entry}
        onRestart={handleRestart}
        onLeaderboard={handleShowLeaderboard}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHUD state={state} />

      <main className="flex-1 mx-auto max-w-3xl px-4 py-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <span className="font-[family-name:var(--font-family-title)] text-[10px] text-muted">
            {state.playerName}
          </span>
          <button
            className="font-[family-name:var(--font-family-title)] text-[10px] text-muted hover:text-health-red transition-colors"
            onClick={handleRestart}
          >
            Quit
          </button>
        </div>

        <h1 className="font-[family-name:var(--font-family-title)] text-lg md:text-xl text-cyan glow-cyan mb-6">
          {node.title}
        </h1>

        <div className="bg-surface/60 rounded-lg p-6 mb-8 border border-surface-light">
          <p className="whitespace-pre-line leading-relaxed text-text">
            {node.narrative}
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-[family-name:var(--font-family-title)] text-xs text-muted mb-4">
            What do you do?
          </h2>
          <div className="flex flex-col gap-3">
            {node.choices.map((choice, i) => {
              const { allowed, reason } = canSelectChoice(state, choice);
              return (
                <ChoiceButton
                  key={i}
                  choice={choice}
                  index={i}
                  locked={!allowed}
                  lockReason={reason}
                  onClick={() => handleChoice(i)}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
