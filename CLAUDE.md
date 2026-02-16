# THE SWORD OF RANCOR

A young-adult/adult choose-your-own-adventure web game. Return a cursed blade to the Steward of the Sword before it consumes your soul.

## Tech Stack
- Next.js 16 (App Router, static export)
- React 19, TypeScript 5.9, Tailwind CSS 4
- GitHub Pages at `rileyroberson.github.io/the-sword-of-rancor`
- localStorage for saves and leaderboard
- PurgoMalum API for name profanity filtering

## Game Mechanics
- **Rancor Gauge (0-100):** Using the sword adds ~15 per use. At 100 = game over.
- **Health Bar (0-100):** Combat/bad choices drain it. At 0 = death.
- **Money:** Start 50 coins. Buy supplies, earn from enemies.
- **Inventory:** Items needed for progression. Sword destroys enemy loot.
- **~4 choices per node** with visual indicators (combat, sword, locked, danger).
- **~10% win rate.** Hero's Journey arc across ~45 story nodes.

## Project Structure
- `app/` — Pages (homepage, story/[nodeId])
- `components/` — GameHUD, StoryPageClient, ChoiceButton, EndingScreen, Leaderboard
- `lib/` — types, storyData (all nodes), gameState, storage, leaderboard, nameFilter, constants

## Visual Style
Retro arcade: Press Start 2P / VT323 fonts, scanline overlay, neon on dark, pixel progress bars, glow effects.

## Key Files
- `lib/storyData.ts` — All story nodes and branching logic
- `lib/gameState.ts` — State initialization and choice processing
- `components/StoryPageClient.tsx` — Main game engine
- `components/EndingScreen.tsx` — Stats screen with Cash App link

## Development
```bash
npm run dev    # Local dev server
npm run build  # Static export to /out
```

## Deployment
Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to main.
