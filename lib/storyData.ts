import { StoryNode } from "./types";

export const storyNodes: Record<string, StoryNode> = {
  // ============================================================
  // ACT I: DEPARTURE
  // ============================================================

  start: {
    id: "start",
    title: "The Mysterious Note",
    narrative: `You return to your cottage after a long day's work to find a crumpled piece of parchment nailed to your door. The handwriting is shaky, as if written by a trembling hand:\n\n"To whoever finds this — I tried to carry it to the Steward of the Sword, but I was too weak. The Sword of Rancor lies beneath the old oak at the crossroads. It must be returned to the Steward, the only one who can contain its power.\n\nDo not use it unless you must. Each time you draw the blade, it binds tighter to your soul.\n\n— A man who waited too long"\n\nYou walk to the crossroads. Beneath the oak, wrapped in rotting cloth, you find a sword of black iron with a faint purple glow. When your fingers touch the hilt, a cold hunger pulses through your arm.`,
    choices: [
      {
        text: "Take the sword and accept the quest",
        preview: "Someone has to do it.",
        nextNodeId: "mentor_01",
      },
      {
        text: "Seek the village elder's counsel first",
        preview: "Wisdom before valor.",
        nextNodeId: "mentor_01",
        moneyChange: -5,
      },
      {
        text: "Leave it — this isn't your problem",
        preview: "Let someone braver handle it.",
        nextNodeId: "lose_refused",
      },
      {
        text: "Take the sword and sell it in town",
        preview: "It looks valuable...",
        nextNodeId: "lose_corrupted",
      },
    ],
  },

  mentor_01: {
    id: "mentor_01",
    title: "The Old Hermit",
    narrative: `On the road north, you encounter a weathered old man sitting on a stone wall, whittling a walking stick. His eyes fix on the cloth-wrapped bundle at your side.\n\n"So you found it," he says quietly. "I've been waiting for someone fool enough — or brave enough — to carry it."\n\nHe introduces himself as Aldric, a former servant of the Steward. He tells you the Steward of the Sword dwells far to the north, past the Thornwood Forest, through the Barren Hills, and beyond the Sunken Pass.\n\n"The sword will whisper to you," he warns. "It wants to be used. Every creature you slay with it feeds the curse. Use it too freely, and you'll never let it go."\n\nHe gestures to his small camp. "I have a few things that might help. But nothing is free in these times."`,
    choices: [
      {
        text: "Buy a health potion (30 coins)",
        preview: "Restores 30 health when used.",
        nextNodeId: "threshold_01",
        requiresMoney: 30,
        moneyChange: -30,
        itemsGained: [{ id: "health_potion", name: "Health Potion", description: "Restores 30 HP", emoji: "🧪", quantity: 1, consumable: true }],
      },
      {
        text: "Buy a rope (25 coins)",
        preview: "Strong hemp rope. Could be useful for climbing.",
        nextNodeId: "threshold_01",
        requiresMoney: 25,
        moneyChange: -25,
        itemsGained: [{ id: "rope", name: "Rope", description: "Strong hemp rope", emoji: "🪢", quantity: 1, consumable: false }],
      },
      {
        text: "Buy a torch (15 coins)",
        preview: "Light in dark places.",
        nextNodeId: "threshold_01",
        requiresMoney: 15,
        moneyChange: -15,
        itemsGained: [{ id: "torch", name: "Torch", description: "Lights dark places", emoji: "🔥", quantity: 1, consumable: false }],
      },
      {
        text: "Thank him and move on — save your money",
        preview: "You may need the coins later.",
        nextNodeId: "threshold_01",
      },
    ],
  },

  threshold_01: {
    id: "threshold_01",
    title: "The Thornwood Crossroads",
    narrative: `The village falls behind you. The road splits at the edge of the Thornwood Forest — a dense tangle of ancient trees with bark as dark as coal.\n\nTo the west, the road follows a river through open countryside. Safer, but longer.\n\nTo the east, a narrow trail cuts directly through the forest. Faster, but the Thornwood is known for its wolves and worse.\n\nA merchant's wagon sits broken at the crossroads, its owner nowhere to be found. A few scattered coins glint in the mud nearby.`,
    choices: [
      {
        text: "Take the forest path — time is short",
        preview: "The direct route through the Thornwood.",
        nextNodeId: "forest_wolves",
      },
      {
        text: "Follow the river road west",
        preview: "Longer but safer.",
        nextNodeId: "river_01",
      },
      {
        text: "Search the broken wagon first",
        preview: "Someone left in a hurry...",
        nextNodeId: "wagon_search",
        moneyChange: 15,
      },
      {
        text: "Wait here and camp for the night",
        preview: "Travel in daylight.",
        nextNodeId: "forest_wolves",
        healthChange: 10,
      },
    ],
  },

  wagon_search: {
    id: "wagon_search",
    title: "The Abandoned Wagon",
    narrative: `You find 15 coins in the mud, along with a torn journal. The last entry reads: "The spiders have gotten bolder. They took my horse in the night. I'm going to try to make it to the village on foot."\n\nInside the wagon, most supplies have been ransacked, but you spot a dusty vial tucked in a corner — a health potion the looters missed.\n\nClaw marks score the wagon's sides. Whatever attacked did so with terrible strength. The forest looms ahead.`,
    choices: [
      {
        text: "Take the forest path",
        preview: "Into the Thornwood.",
        nextNodeId: "forest_wolves",
        itemsGained: [{ id: "health_potion", name: "Health Potion", description: "Restores 30 HP", emoji: "🧪", quantity: 1, consumable: true }],
      },
      {
        text: "Take the river road instead",
        preview: "Those claw marks are unsettling.",
        nextNodeId: "river_01",
        itemsGained: [{ id: "health_potion", name: "Health Potion", description: "Restores 30 HP", emoji: "🧪", quantity: 1, consumable: true }],
      },
      {
        text: "Follow the merchant's footprints toward the village",
        preview: "Maybe he needs help.",
        nextNodeId: "lose_lost_backtrack",
      },
      {
        text: "Burn the wagon to create a signal fire",
        preview: "Attract attention... good or bad.",
        nextNodeId: "forest_wolves",
        healthChange: -5,
      },
    ],
  },

  // ============================================================
  // ACT II: INITIATION — Forest Path
  // ============================================================

  forest_wolves: {
    id: "forest_wolves",
    title: "Wolves in the Thornwood",
    narrative: `You're barely an hour into the forest when you hear them — low growls from three directions. Five wolves emerge from the undergrowth, their eyes catching what little light filters through the canopy.\n\nThe alpha is enormous, scarred across one eye. They fan out around you, cutting off retreat.\n\nThe Sword of Rancor hums at your side. You can feel it almost vibrating, eager to be drawn. One swing and they'd all be dead. But you can also see a low-hanging branch above, and your ears catch the sound of rushing water nearby.`,
    choices: [
      {
        text: "Draw the Sword of Rancor",
        preview: "One swing ends it. But at what cost?",
        nextNodeId: "forest_after_wolves",
        usesSword: true,
        isCombat: true,
        enemyDefeated: true,
        moneyChange: 10,
      },
      {
        text: "Climb the tree and wait them out",
        preview: "They'll lose interest... hopefully.",
        nextNodeId: "forest_after_wolves",
        healthChange: -10,
      },
      {
        text: "Sprint toward the river sound",
        preview: "Wolves hate deep water. Maybe.",
        nextNodeId: "river_01",
        healthChange: -15,
      },
      {
        text: "Use your torch to scare them off",
        preview: "Fire drives most beasts away.",
        nextNodeId: "forest_after_wolves",
        requiresItem: "torch",
        healthChange: -5,
        itemsLost: ["torch"],
      },
    ],
  },

  forest_after_wolves: {
    id: "forest_after_wolves",
    title: "Deeper Into the Thornwood",
    narrative: `Past the wolves, the forest grows darker. Strange webs stretch between the trees — thick as rope, glistening with dew. The silence is unnatural.\n\nAhead, the path splits again. One trail is wider and shows signs of recent travel — bootprints in the mud. The other is barely visible, choked with thorns, but a faded trail marker points toward "Barren Hills" — your destination.\n\nA distant chittering echoes from somewhere above.`,
    choices: [
      {
        text: "Follow the bootprints on the wider path",
        preview: "Where others have walked safely.",
        nextNodeId: "goblin_camp",
      },
      {
        text: "Take the narrow trail toward Barren Hills",
        preview: "Direct but overgrown.",
        nextNodeId: "spider_nest",
      },
      {
        text: "Look up to investigate the chittering",
        preview: "Know your enemy.",
        nextNodeId: "spider_nest",
        healthChange: -5,
      },
      {
        text: "Set camp here and rest before continuing",
        preview: "This feels like a bad place to stop.",
        nextNodeId: "lose_spiders_camp",
      },
    ],
  },

  // ============================================================
  // ACT II: INITIATION — River Path
  // ============================================================

  river_01: {
    id: "river_01",
    title: "The River Road",
    narrative: `The river road is peaceful — birdsong, clear water, and wildflowers along the banks. For a moment, you almost forget the cursed blade strapped to your back.\n\nAfter several hours of walking, you spot a small riverside settlement. A merchant has set up a colorful stall, and a ferryman sits by a long wooden boat.\n\n"Cross the river here," the ferryman calls, "and you'll cut two days off your journey through the hills. Only costs 20 coins."\n\nThe merchant waves you over. "Supplies, traveler? The road ahead isn't kind."`,
    choices: [
      {
        text: "Pay the ferryman to cross (20 coins)",
        preview: "Saves two days of travel.",
        nextNodeId: "barren_hills_01",
        requiresMoney: 20,
        moneyChange: -20,
      },
      {
        text: "Browse the merchant's wares",
        preview: "See what's for sale.",
        nextNodeId: "river_merchant",
      },
      {
        text: "Wade across the river yourself",
        preview: "Save the money, risk the current.",
        nextNodeId: "barren_hills_01",
        healthChange: -15,
      },
      {
        text: "Continue following the river road north",
        preview: "Longer, but free.",
        nextNodeId: "goblin_camp",
      },
    ],
  },

  river_merchant: {
    id: "river_merchant",
    title: "The Riverside Merchant",
    narrative: `The merchant is a stout woman named Brin with a warm smile and sharp eyes. She lays out her goods on the stall:\n\n"Health potion — good for what ails you. Rope — strongest hemp in the valley. And this..." She holds up a small glowing stone. "A Rune Stone. Old magic. They say it protects against curses."\n\nShe eyes the cloth-wrapped sword on your back. "Seems like you might need that last one more than most."`,
    choices: [
      {
        text: "Buy the Rune Stone (45 coins)",
        preview: "Protects against curses...",
        nextNodeId: "barren_hills_01",
        requiresMoney: 45,
        moneyChange: -45,
        itemsGained: [{ id: "rune_stone", name: "Rune Stone", description: "Resists dark curses", emoji: "💎", quantity: 1, consumable: false }],
      },
      {
        text: "Buy a health potion (30 coins)",
        preview: "Restores 30 health.",
        nextNodeId: "barren_hills_01",
        requiresMoney: 30,
        moneyChange: -30,
        itemsGained: [{ id: "health_potion", name: "Health Potion", description: "Restores 30 HP", emoji: "🧪", quantity: 1, consumable: true }],
      },
      {
        text: "Buy rope (25 coins)",
        preview: "Strong hemp rope.",
        nextNodeId: "barren_hills_01",
        requiresMoney: 25,
        moneyChange: -25,
        itemsGained: [{ id: "rope", name: "Rope", description: "Strong hemp rope", emoji: "🪢", quantity: 1, consumable: false }],
      },
      {
        text: "Move on without buying",
        preview: "Save your coins.",
        nextNodeId: "barren_hills_01",
      },
    ],
  },

  // ============================================================
  // ACT II: Goblin Camp
  // ============================================================

  goblin_camp: {
    id: "goblin_camp",
    title: "The Goblin Camp",
    narrative: `The bootprints lead to trouble. A goblin raiding camp sits in a forest clearing — four crude tents around a fire pit. Six goblins argue loudly over a pile of stolen goods: coins, food, and what appears to be a silver key on a chain.\n\nThey haven't spotted you yet. From your hiding spot behind a fallen log, you count their weapons: rusty swords, a few bows. Dangerous in numbers, but not clever.\n\nThe Sword of Rancor pulses eagerly.`,
    choices: [
      {
        text: "Charge in with the Sword of Rancor",
        preview: "They wouldn't stand a chance.",
        nextNodeId: "goblin_aftermath_sword",
        usesSword: true,
        isCombat: true,
        enemyDefeated: true,
        moneyChange: 5,
      },
      {
        text: "Sneak around the camp",
        preview: "Avoid the fight entirely.",
        nextNodeId: "spider_nest",
      },
      {
        text: "Create a distraction and steal from the pile",
        preview: "Risky, but rewarding.",
        nextNodeId: "goblin_steal",
        healthChange: -10,
        moneyChange: 25,
      },
      {
        text: "Fight them with fists and wits — no sword",
        preview: "Honorable but dangerous.",
        nextNodeId: "goblin_aftermath_nosword",
        isCombat: true,
        healthChange: -25,
        enemyDefeated: true,
        moneyChange: 20,
      },
    ],
  },

  goblin_aftermath_sword: {
    id: "goblin_aftermath_sword",
    title: "Ashes and Silence",
    narrative: `The sword cuts through them like a scythe through wheat. It's over in seconds. The purple glow intensifies as the blade drinks deep.\n\nYou stand among the ruins, breathing hard. The sword feels warmer in your grip. Heavier. And for a moment, you don't want to put it down.\n\nThe goblins' camp has little of value — the sword's power burned through most of their supplies. A few coins survived, but the silver key is scorched beyond recognition.\n\nYou force yourself to sheathe the blade and keep moving.`,
    choices: [
      {
        text: "Press on toward the Barren Hills",
        preview: "No time to waste.",
        nextNodeId: "barren_hills_01",
      },
      {
        text: "Search the camp more thoroughly",
        preview: "Maybe something survived.",
        nextNodeId: "barren_hills_01",
        moneyChange: 10,
      },
      {
        text: "Take the narrow trail toward the hills",
        preview: "A shortcut through rough terrain.",
        nextNodeId: "spider_nest",
      },
      {
        text: "Rest here before continuing",
        preview: "The battle took something out of you.",
        nextNodeId: "barren_hills_01",
        healthChange: 10,
      },
    ],
  },

  goblin_aftermath_nosword: {
    id: "goblin_aftermath_nosword",
    title: "Hard-Won Victory",
    narrative: `It's a brutal fight. You take hits — a rusty blade nicks your arm, a stone catches your shoulder — but you prevail through determination and a sturdy branch used as a club.\n\nThe surviving goblins scatter into the trees. In their camp, you find coins, dried meat, and a silver key on a chain. One of the goblins was wearing it.\n\nThe key is etched with runes you don't recognize. Something tells you it's important.`,
    choices: [
      {
        text: "Take the silver key and move on",
        preview: "It might open something important.",
        nextNodeId: "barren_hills_01",
        itemsGained: [{ id: "silver_key", name: "Silver Key", description: "Etched with old runes", emoji: "🗝️", quantity: 1, consumable: false }],
      },
      {
        text: "Take everything and head for the hills",
        preview: "Leave nothing behind.",
        nextNodeId: "barren_hills_01",
        moneyChange: 10,
        itemsGained: [{ id: "silver_key", name: "Silver Key", description: "Etched with old runes", emoji: "🗝️", quantity: 1, consumable: false }],
      },
      {
        text: "Use a health potion to patch up",
        preview: "You're hurt from the fight.",
        nextNodeId: "barren_hills_01",
        requiresItem: "health_potion",
        healthChange: 30,
        itemsLost: ["health_potion"],
        itemsGained: [{ id: "silver_key", name: "Silver Key", description: "Etched with old runes", emoji: "🗝️", quantity: 1, consumable: false }],
      },
      {
        text: "Leave the key — it could be cursed",
        preview: "You've had enough curses.",
        nextNodeId: "barren_hills_01",
      },
    ],
  },

  goblin_steal: {
    id: "goblin_steal",
    title: "The Quick-Fingered Thief",
    narrative: `You toss a rock into the bushes on the far side of camp. The goblins shriek and charge toward the noise, grabbing weapons.\n\nYou dart in, grab a fistful of coins and the silver key. But a goblin left on guard spots you — its arrow grazes your side as you sprint into the woods.\n\nBehind you, the goblins screech in pursuit, but they give up after a few minutes. You're faster, and they're cowards at heart.`,
    choices: [
      {
        text: "Head for the Barren Hills with your loot",
        preview: "Keep moving.",
        nextNodeId: "barren_hills_01",
        itemsGained: [{ id: "silver_key", name: "Silver Key", description: "Etched with old runes", emoji: "🗝️", quantity: 1, consumable: false }],
      },
      {
        text: "Find a place to rest and tend your wound",
        preview: "The arrow graze needs attention.",
        nextNodeId: "barren_hills_01",
        healthChange: 5,
        itemsGained: [{ id: "silver_key", name: "Silver Key", description: "Etched with old runes", emoji: "🗝️", quantity: 1, consumable: false }],
      },
      {
        text: "Use a health potion",
        preview: "Heal the wound properly.",
        nextNodeId: "barren_hills_01",
        requiresItem: "health_potion",
        healthChange: 30,
        itemsLost: ["health_potion"],
        itemsGained: [{ id: "silver_key", name: "Silver Key", description: "Etched with old runes", emoji: "🗝️", quantity: 1, consumable: false }],
      },
      {
        text: "Circle back to steal more",
        preview: "Greed has a cost.",
        nextNodeId: "lose_goblin_ambush",
      },
    ],
  },

  // ============================================================
  // ACT II: Spider Nest
  // ============================================================

  spider_nest: {
    id: "spider_nest",
    title: "The Web-Choked Hollow",
    narrative: `The narrow trail ends abruptly at a hollow draped in webs thick as sailcloth. Two giant spiders — each the size of a large dog — descend from the canopy on silk threads, mandibles clicking.\n\nThe webs are everywhere. They cling to your boots, your clothes. If you don't act fast, you'll be trapped.\n\nBeyond the hollow, you can see daylight — the edge of the forest and the Barren Hills beyond.`,
    choices: [
      {
        text: "Cut through them with the Sword of Rancor",
        preview: "The sword hungers. The spiders die.",
        nextNodeId: "barren_hills_01",
        usesSword: true,
        isCombat: true,
        enemyDefeated: true,
      },
      {
        text: "Burn the webs with your torch",
        preview: "Fire solves many problems.",
        nextNodeId: "barren_hills_01",
        requiresItem: "torch",
        itemsLost: ["torch"],
        enemyDefeated: true,
        moneyChange: 15,
        itemsGained: [{ id: "spider_silk", name: "Spider Silk", description: "Strong as steel thread", emoji: "🕸️", quantity: 1, consumable: false }],
      },
      {
        text: "Try to sneak past while they're distracted",
        preview: "Move slowly... very slowly.",
        nextNodeId: "barren_hills_01",
        healthChange: -20,
      },
      {
        text: "Fight them without the sword",
        preview: "Two giant spiders. Two fists. Bad odds.",
        nextNodeId: "barren_hills_01",
        isCombat: true,
        healthChange: -30,
        enemyDefeated: true,
        moneyChange: 15,
        itemsGained: [{ id: "spider_silk", name: "Spider Silk", description: "Strong as steel thread", emoji: "🕸️", quantity: 1, consumable: false }],
      },
    ],
  },

  // ============================================================
  // ACT II: Barren Hills
  // ============================================================

  barren_hills_01: {
    id: "barren_hills_01",
    title: "The Barren Hills",
    narrative: `The forest gives way to windswept hills of brown grass and gray stone. The sky stretches endlessly above — beautiful and empty.\n\nThe road here is ancient, paved with stones worn smooth by centuries of travelers. Milestone markers count down the distance to the Sunken Pass.\n\nAfter half a day's walk, you spot three things: a traveler's inn built into the hillside, a massive bird circling high overhead, and a old stone bridge spanning a deep ravine ahead.`,
    choices: [
      {
        text: "Stop at the inn to rest and resupply",
        preview: "A bed, food, and maybe information.",
        nextNodeId: "hills_inn",
      },
      {
        text: "Press straight for the bridge",
        preview: "No time to waste.",
        nextNodeId: "bridge_guardian",
      },
      {
        text: "Watch the circling bird more carefully",
        preview: "That's a very large bird...",
        nextNodeId: "giant_eagle",
      },
      {
        text: "Leave the road and cut across the hills",
        preview: "Avoid whatever's on the main path.",
        nextNodeId: "hills_lost",
      },
    ],
  },

  hills_inn: {
    id: "hills_inn",
    title: "The Hillside Inn",
    narrative: `The inn is warm and surprisingly well-stocked. The innkeeper, a retired soldier named Gareth, pours you an ale and studies you carefully.\n\n"Heading north?" He lowers his voice. "There's a bridge guardian up ahead. Big brute in dark armor. Won't let anyone pass without a fight or a toll."\n\nHe leans closer. "But there's a riddle he accepts. Answer it right, and he lets you through. My grandfather knew the answer, but..." He scratches his head. "Something about growing without being alive."\n\nThe inn also has supplies for sale and a room for the night.`,
    choices: [
      {
        text: "Rest for the night (10 coins, +20 HP)",
        preview: "A real bed and a hot meal.",
        nextNodeId: "bridge_guardian",
        requiresMoney: 10,
        moneyChange: -10,
        healthChange: 20,
      },
      {
        text: "Buy a health potion (30 coins)",
        preview: "The innkeeper has one left.",
        nextNodeId: "bridge_guardian",
        requiresMoney: 30,
        moneyChange: -30,
        itemsGained: [{ id: "health_potion", name: "Health Potion", description: "Restores 30 HP", emoji: "🧪", quantity: 1, consumable: true }],
      },
      {
        text: "Ask Gareth more about the Steward of the Sword",
        preview: "Local knowledge is valuable.",
        nextNodeId: "bridge_guardian",
        itemsGained: [{ id: "mine_map", name: "Rough Map", description: "Sketch of the Steward's keep", emoji: "🗺️", quantity: 1, consumable: false }],
      },
      {
        text: "Leave immediately — every moment counts",
        preview: "Rest is a luxury you can't afford.",
        nextNodeId: "bridge_guardian",
      },
    ],
  },

  hills_lost: {
    id: "hills_lost",
    title: "Lost in the Hills",
    narrative: `The hills are deceptively treacherous — what looks flat from the road is actually a maze of gullies, loose shale, and hidden drops. You wander for hours, losing your bearings.\n\nBy the time you find the road again, you've lost precious time and taken a nasty fall. Your ankle throbs, and you've used up energy you can't afford to waste.\n\nThe bridge lies ahead. At least you found your way back.`,
    choices: [
      {
        text: "Limp toward the bridge",
        preview: "Press on despite the pain.",
        nextNodeId: "bridge_guardian",
        healthChange: -15,
      },
      {
        text: "Use a health potion for the ankle",
        preview: "Can't afford to be slowed down.",
        nextNodeId: "bridge_guardian",
        requiresItem: "health_potion",
        healthChange: 15,
        itemsLost: ["health_potion"],
      },
      {
        text: "Rest here and bind the ankle",
        preview: "Take a moment to recover.",
        nextNodeId: "bridge_guardian",
        healthChange: -5,
      },
      {
        text: "The sword could numb the pain...",
        preview: "Its power could ease suffering. At a cost.",
        nextNodeId: "bridge_guardian",
        rancorChange: 8,
      },
    ],
  },

  giant_eagle: {
    id: "giant_eagle",
    title: "The Great Eagle",
    narrative: `The bird descends — and it's no ordinary bird. A great eagle with a wingspan wider than a house lands on a rocky outcrop above you. Its golden eyes regard you with unmistakable intelligence.\n\nIt speaks, its voice like wind through mountain peaks: "You carry something that should not exist. I can smell the curse on you."\n\nThe eagle ruffles its feathers. "I could carry you across the ravine ahead, saving you the trouble of the bridge guardian. But the winds are against us today. It would be... rough."`,
    choices: [
      {
        text: "Accept the eagle's offer to fly across",
        preview: "Skip the bridge entirely.",
        nextNodeId: "sunken_pass_01",
        healthChange: -10,
      },
      {
        text: "Ask the eagle about the Steward of the Sword",
        preview: "A creature this old must know things.",
        nextNodeId: "bridge_guardian",
        itemsGained: [{ id: "eagle_feather", name: "Eagle Feather", description: "Gift from the Great Eagle", emoji: "🪶", quantity: 1, consumable: false }],
      },
      {
        text: "Politely decline and head for the bridge",
        preview: "You prefer solid ground.",
        nextNodeId: "bridge_guardian",
      },
      {
        text: "Ask the eagle to take the sword to the Steward",
        preview: "Maybe the eagle could deliver it.",
        nextNodeId: "bridge_guardian",
      },
    ],
  },

  // ============================================================
  // ACT II: Bridge Guardian / Approach
  // ============================================================

  bridge_guardian: {
    id: "bridge_guardian",
    title: "The Bridge Guardian",
    narrative: `The stone bridge arches over a chasm so deep you can't see the bottom. Standing in the center is a figure in dark iron armor, seven feet tall, wielding a club the size of a young tree.\n\nIts voice echoes off the stone: "None cross without payment. Gold, blood, or wisdom — choose your toll."\n\nIt plants the club on the bridge with a ground-shaking THUD.\n\n"My riddle, if you dare: I am not alive, yet I grow. I have no lungs, yet I need air. I have no mouth, yet water kills me. What am I?"`,
    choices: [
      {
        text: "Answer the riddle: \"Fire\"",
        preview: "Not alive, grows, needs air, killed by water.",
        nextNodeId: "sunken_pass_01",
        moneyChange: 20,
      },
      {
        text: "Pay the gold toll (30 coins)",
        preview: "The safe option.",
        nextNodeId: "sunken_pass_01",
        requiresMoney: 30,
        moneyChange: -30,
      },
      {
        text: "Fight with the Sword of Rancor",
        preview: "One swing. But this creature is ancient.",
        nextNodeId: "sunken_pass_01",
        usesSword: true,
        isCombat: true,
        enemyDefeated: true,
        isHighRisk: true,
      },
      {
        text: "Fight without the sword",
        preview: "A massive opponent. This will hurt.",
        nextNodeId: "sunken_pass_01",
        isCombat: true,
        healthChange: -35,
        requiresMinHealth: 40,
        enemyDefeated: true,
        moneyChange: 25,
      },
    ],
  },

  // ============================================================
  // ACT II: Sunken Pass — The Ordeal
  // ============================================================

  sunken_pass_01: {
    id: "sunken_pass_01",
    title: "The Sunken Pass",
    narrative: `Beyond the bridge, the land drops into a narrow valley shrouded in mist — the Sunken Pass. The temperature falls sharply. Your breath fogs in the air.\n\nThe road descends into darkness. Ancient ruins line the path — crumbling towers and walls from a kingdom long forgotten.\n\nAhead, the pass splits into three tunnels carved into the mountainside. Faded inscriptions mark each entrance:\n\nLeft: "Through darkness, truth."\nCenter: "The straightest path is not always shortest."\nRight: "Those who hear the song will follow."`,
    choices: [
      {
        text: "Enter the left tunnel (\"Through darkness, truth\")",
        preview: "You'll need light.",
        nextNodeId: "tunnel_dark",
      },
      {
        text: "Enter the center tunnel (\"The straightest path\")",
        preview: "Seems like a warning.",
        nextNodeId: "tunnel_center",
      },
      {
        text: "Enter the right tunnel (\"The song\")",
        preview: "What song?",
        nextNodeId: "tunnel_song",
      },
      {
        text: "Climb over the mountain instead",
        preview: "Avoid the tunnels entirely.",
        nextNodeId: "mountain_climb",
      },
    ],
  },

  tunnel_dark: {
    id: "tunnel_dark",
    title: "The Dark Tunnel",
    narrative: `The tunnel is pitch black within ten steps. The darkness is absolute — you can't see your hand in front of your face.\n\nSomething moves in the dark. You hear breathing that isn't yours. The Sword of Rancor glows faintly purple, casting just enough light to see the outline of something large crouched in the tunnel ahead.\n\nA cave troll. Blind, but with hearing sharp enough to track a mouse at fifty paces.`,
    choices: [
      {
        text: "Light your torch to see properly",
        preview: "The troll is blind — light won't help it.",
        nextNodeId: "tunnel_dark_lit",
        requiresItem: "torch",
      },
      {
        text: "Use the Sword of Rancor — its glow lights the way",
        preview: "Kill the troll and light the tunnel.",
        nextNodeId: "wizard_riddles",
        usesSword: true,
        isCombat: true,
        enemyDefeated: true,
      },
      {
        text: "Move silently past the troll",
        preview: "It can't see you. Just be quiet.",
        nextNodeId: "wizard_riddles",
        healthChange: -10,
      },
      {
        text: "Turn back and choose another tunnel",
        preview: "This doesn't feel right.",
        nextNodeId: "sunken_pass_01",
      },
    ],
  },

  tunnel_dark_lit: {
    id: "tunnel_dark_lit",
    title: "Light in the Darkness",
    narrative: `Your torch blazes to life. The cave troll flinches at the light — though blind, it can feel the heat. It's enormous, gray-skinned, and blocks most of the tunnel.\n\nBut in the torchlight, you spot something: a narrow side passage behind a crumbled wall, just wide enough to squeeze through. And beyond it — daylight.`,
    choices: [
      {
        text: "Squeeze through the side passage",
        preview: "Avoid the troll entirely.",
        nextNodeId: "wizard_riddles",
        itemsLost: ["torch"],
        moneyChange: 10,
      },
      {
        text: "Drive the troll back with fire",
        preview: "Wave the torch at it aggressively.",
        nextNodeId: "wizard_riddles",
        itemsLost: ["torch"],
        enemyDefeated: true,
        healthChange: -10,
        moneyChange: 20,
      },
      {
        text: "Use the sword while it's disoriented",
        preview: "An easy kill while it's confused.",
        nextNodeId: "wizard_riddles",
        usesSword: true,
        isCombat: true,
        enemyDefeated: true,
      },
      {
        text: "Throw the torch to distract it and run past",
        preview: "It'll follow the heat.",
        nextNodeId: "wizard_riddles",
        itemsLost: ["torch"],
        healthChange: -5,
      },
    ],
  },

  tunnel_center: {
    id: "tunnel_center",
    title: "The Straightest Path",
    narrative: `The center tunnel is well-built — smooth walls, even floor. Too well-built. Your footsteps echo with suspicious regularity.\n\nTwenty steps in, you hear a click. The floor ahead shimmers — pressure plates. The walls are lined with small holes. An ancient trap system, still very much active.\n\nBeyond the trapped section, you can see the tunnel opening to daylight. It's maybe fifty feet of traps between you and freedom.`,
    choices: [
      {
        text: "Study the pattern and navigate carefully",
        preview: "Step only where it's safe.",
        nextNodeId: "wizard_riddles",
        healthChange: -15,
      },
      {
        text: "Use your rope to swing over the trapped section",
        preview: "Tie it to that overhead beam.",
        nextNodeId: "wizard_riddles",
        requiresItem: "rope",
        healthChange: -5,
      },
      {
        text: "Sprint through as fast as possible",
        preview: "Speed might outrun the mechanisms.",
        nextNodeId: "wizard_riddles",
        healthChange: -25,
      },
      {
        text: "Turn back and try another tunnel",
        preview: "Not worth the risk.",
        nextNodeId: "sunken_pass_01",
      },
    ],
  },

  tunnel_song: {
    id: "tunnel_song",
    title: "The Singing Tunnel",
    narrative: `The moment you enter, you hear it — a haunting melody that seems to come from the stone itself. Beautiful. Hypnotic. Your feet want to follow it deeper.\n\nThe tunnel winds and curves. The song grows louder, sweeter. You realize with a jolt that you've been walking for much longer than you thought. The entrance is far behind.\n\nAhead, a figure sits cross-legged in the tunnel — a pale woman playing a silver flute. Her eyes are closed. Around her, three other travelers sit motionless, expressions of bliss on their faces. They look like they've been here for days.`,
    choices: [
      {
        text: "Cover your ears and push past her",
        preview: "Don't listen. Keep moving.",
        nextNodeId: "wizard_riddles",
        healthChange: -10,
      },
      {
        text: "Use the sword to shatter the flute",
        preview: "End the enchantment by force.",
        nextNodeId: "wizard_riddles",
        usesSword: true,
        rancorChange: 10,
      },
      {
        text: "Sit down and listen to the music",
        preview: "It's so beautiful...",
        nextNodeId: "lose_enchanted",
      },
      {
        text: "Use the Rune Stone to resist the magic",
        preview: "The stone's power against her spell.",
        nextNodeId: "wizard_riddles",
        requiresItem: "rune_stone",
        moneyChange: 15,
      },
    ],
  },

  // ============================================================
  // ACT II: Wizard Riddles
  // ============================================================

  wizard_riddles: {
    id: "wizard_riddles",
    title: "The Wandering Wizard",
    narrative: `Beyond the tunnels, the pass opens to a gray valley. Sitting on a boulder in the middle of the road is an old wizard in tattered blue robes, a long staff across his knees.\n\n"Ah," he says, peering at you with eyes like lanterns. "The sword-bearer. I've been expecting you. Or someone like you, at any rate."\n\nHe stands and blocks the road. "I am Theron, keeper of this pass. Before you continue, you must prove you carry the sword by choice, not by compulsion. Answer me this:"\n\n"What grows stronger the more you give it away, yet vanishes if you try to keep it?"`,
    choices: [
      {
        text: "\"Trust\"",
        preview: "Trust grows when shared.",
        nextNodeId: "wizard_reward",
      },
      {
        text: "\"Love\"",
        preview: "Love multiplies when given freely.",
        nextNodeId: "wizard_reward",
      },
      {
        text: "\"Knowledge\"",
        preview: "Teaching makes you wiser.",
        nextNodeId: "wizard_wrong",
      },
      {
        text: "\"I don't have time for riddles\" — push past him",
        preview: "Wizards and their games.",
        nextNodeId: "wizard_angry",
        healthChange: -20,
      },
    ],
  },

  wizard_reward: {
    id: "wizard_reward",
    title: "The Wizard's Gift",
    narrative: `Theron smiles — a warm, genuine smile. "Good. The sword hasn't taken your heart yet."\n\nHe reaches into his robes and produces a small wax disc stamped with an ancient sigil. "The Steward's Seal. Show this to the Steward of the Sword, and he will know you come in good faith. Without it, he may not trust you — and the handoff will be far more difficult."\n\nHe pauses. "The Steward is the only one who can contain the blade's power. He has guarded cursed weapons for centuries."\n\nHe steps aside and gestures to the road ahead. "The Steward's keep is close now. Two more valleys and a climb. Be careful — the land near his stronghold draws dark things."`,
    choices: [
      {
        text: "Take the seal and thank him",
        preview: "This could be essential.",
        nextNodeId: "approach_01",
        itemsGained: [{ id: "stewards_seal", name: "Steward's Seal", description: "Proves your identity to the Steward", emoji: "✨", quantity: 1, consumable: true }],
      },
      {
        text: "Ask Theron to come with you",
        preview: "A wizard ally would help.",
        nextNodeId: "approach_01",
        itemsGained: [{ id: "stewards_seal", name: "Steward's Seal", description: "Proves your identity to the Steward", emoji: "✨", quantity: 1, consumable: true }],
      },
      {
        text: "Ask about the dark things near the Steward's keep",
        preview: "Know your enemy.",
        nextNodeId: "approach_01",
        itemsGained: [
          { id: "stewards_seal", name: "Steward's Seal", description: "Proves your identity to the Steward", emoji: "✨", quantity: 1, consumable: true },
          { id: "mine_map", name: "Rough Map", description: "Sketch of the Steward's keep", emoji: "🗺️", quantity: 1, consumable: false },
        ],
      },
      {
        text: "Refuse the seal — you'll manage without it",
        preview: "You don't trust wizard gifts.",
        nextNodeId: "approach_01",
      },
    ],
  },

  wizard_wrong: {
    id: "wizard_wrong",
    title: "Not Quite Right",
    narrative: `Theron shakes his head slowly. "Knowledge can be hoarded in books and still endure. That is not the answer I sought."\n\nHe studies you for a long moment. "But you tried honestly, and that's worth something. I'll let you pass — but I cannot give you my gift. You haven't proven you understand what the sword takes from you."\n\nHe steps aside, looking troubled.`,
    choices: [
      {
        text: "Continue on the road north",
        preview: "You'll figure it out.",
        nextNodeId: "approach_01",
      },
      {
        text: "Ask if you can try again",
        preview: "Please — one more chance.",
        nextNodeId: "approach_01",
      },
      {
        text: "Offer him money for his help",
        preview: "Everyone has a price.",
        nextNodeId: "approach_01",
        moneyChange: -15,
      },
      {
        text: "Threaten him with the sword",
        preview: "Give me what you have, wizard.",
        nextNodeId: "lose_wizard_curse",
      },
    ],
  },

  wizard_angry: {
    id: "wizard_angry",
    title: "A Wizard Scorned",
    narrative: `You try to shove past Theron. His staff cracks against the ground and a wall of force hurls you backward twenty feet. You land hard on stone, the breath knocked out of you.\n\n"Fool," he says, his voice now thunderous. "The impatience of the sword is already in you. I'll let you pass because your quest is important, but you'll get nothing from me."\n\nHe vanishes in a swirl of blue smoke, leaving you bruised and alone.`,
    choices: [
      {
        text: "Pick yourself up and keep going",
        preview: "Stubborn works too.",
        nextNodeId: "approach_01",
      },
      {
        text: "Use a health potion",
        preview: "That hurt more than expected.",
        nextNodeId: "approach_01",
        requiresItem: "health_potion",
        healthChange: 30,
        itemsLost: ["health_potion"],
      },
      {
        text: "Sit and rest a moment",
        preview: "Everything aches.",
        nextNodeId: "approach_01",
        healthChange: 5,
      },
      {
        text: "Curse the wizard and press forward",
        preview: "Who needs magic oil anyway?",
        nextNodeId: "approach_01",
      },
    ],
  },

  // ============================================================
  // ACT III: Approach to the Steward's Keep
  // ============================================================

  approach_01: {
    id: "approach_01",
    title: "The Shadow Valley",
    narrative: `The road descends into a valley perpetually in shadow. The air is thick and cold. Twisted trees grow at odd angles, as if recoiling from something.\n\nThe Sword of Rancor is restless now — you can feel it pulling toward the north, toward the Steward's keep. It knows what awaits there. And it doesn't want to go.\n\nA band of armed bandits blocks the road ahead — six rough-looking men and women with crossbows trained on you.\n\n"Drop your valuables," their leader calls. "Especially that fancy sword."`,
    choices: [
      {
        text: "Draw the Sword of Rancor",
        preview: "They have no idea what they're asking for.",
        nextNodeId: "approach_02",
        usesSword: true,
        isCombat: true,
        enemyDefeated: true,
        isHighRisk: true,
      },
      {
        text: "Pay them off (25 coins)",
        preview: "Not worth dying over coins.",
        nextNodeId: "approach_02",
        requiresMoney: 25,
        moneyChange: -25,
      },
      {
        text: "Negotiate — show the silver key as payment",
        preview: "This looks valuable enough.",
        nextNodeId: "approach_02",
        requiresItem: "silver_key",
        itemsLost: ["silver_key"],
      },
      {
        text: "Fight without the sword",
        preview: "Six against one, with crossbows. Brave.",
        nextNodeId: "approach_02",
        isCombat: true,
        healthChange: -30,
        requiresMinHealth: 35,
        enemyDefeated: true,
        moneyChange: 30,
      },
    ],
  },

  approach_02: {
    id: "approach_02",
    title: "The Chasm of Echoes",
    narrative: `The valley ends at a massive chasm. The only way across is a crumbling rope bridge that sways in the wind — or a path down into the chasm itself, which would add hours.\n\nAcross the chasm, you can see a great stone fortress built into the mountainside — the Steward's keep. Torchlight flickers in narrow windows. Two weathered statues of armored wardens flank the entrance.\n\nThe bridge looks like it could hold your weight. Probably. The ropes creak ominously.\n\nBelow, in the chasm, you hear something large moving.`,
    choices: [
      {
        text: "Cross the rope bridge carefully",
        preview: "It's held this long...",
        nextNodeId: "mines_entrance",
        healthChange: -5,
      },
      {
        text: "Use your own rope to reinforce the bridge first",
        preview: "Safety first.",
        nextNodeId: "mines_entrance",
        requiresItem: "rope",
      },
      {
        text: "Climb down into the chasm and across",
        preview: "Slower but no bridge to break.",
        nextNodeId: "chasm_creature",
      },
      {
        text: "Use the spider silk to reinforce the bridge",
        preview: "Strong as steel, light as air.",
        nextNodeId: "mines_entrance",
        requiresItem: "spider_silk",
      },
    ],
  },

  chasm_creature: {
    id: "chasm_creature",
    title: "The Thing in the Chasm",
    narrative: `Halfway down the chasm wall, you realize what lives here — a massive serpent, coiled among the rocks, its scales the same gray as the stone. It raises its head, tongue tasting the air.\n\nIt's between you and the far wall. There's no going around it.`,
    choices: [
      {
        text: "Use the Sword of Rancor",
        preview: "One strike, even against this beast.",
        nextNodeId: "mines_entrance",
        usesSword: true,
        isCombat: true,
        enemyDefeated: true,
        isHighRisk: true,
      },
      {
        text: "Climb back up and take the bridge",
        preview: "The bridge seems safer now.",
        nextNodeId: "mines_entrance",
        healthChange: -15,
      },
      {
        text: "Try to move past while it's sluggish",
        preview: "It's cold down here — serpents are slow in the cold.",
        nextNodeId: "mines_entrance",
        healthChange: -20,
      },
      {
        text: "Throw food from your pack to distract it",
        preview: "Maybe it's hungry for something else.",
        nextNodeId: "mines_entrance",
        moneyChange: -10,
        healthChange: -5,
      },
    ],
  },

  // ============================================================
  // ACT III: The Steward's Keep
  // ============================================================

  mines_entrance: {
    id: "mines_entrance",
    title: "The Steward's Keep",
    narrative: `You stand before the great stone fortress. The weathered statues of wardens loom above you, swords crossed over the entrance. Ancient runes are carved into the lintel:\n\n"What is carried here shall be kept. What is surrendered here shall be contained."\n\nThe entrance is sealed by a heavy iron door — but it has a keyhole. A silver keyhole.\n\nBeyond the door, if you can open it, dwells the Steward of the Sword — the only one who can take the blade from you and contain its power.\n\nThe sword is vibrating now, humming with energy. It knows.`,
    choices: [
      {
        text: "Use the silver key",
        preview: "The keyhole matches perfectly.",
        nextNodeId: "mines_forge",
        requiresItem: "silver_key",
      },
      {
        text: "Try to force the door open",
        preview: "It's iron, but it's old.",
        nextNodeId: "mines_forge",
        healthChange: -15,
      },
      {
        text: "Use the Sword of Rancor to cut through",
        preview: "The cursed blade against an ancient door.",
        nextNodeId: "mines_forge",
        usesSword: true,
        isHighRisk: true,
      },
      {
        text: "Search for another way in",
        preview: "There may be a side passage.",
        nextNodeId: "mines_forge",
        healthChange: -10,
        requiresItem: "rope",
      },
    ],
  },

  mines_forge: {
    id: "mines_forge",
    title: "The Steward's Chamber",
    narrative: `The chamber is vast and ancient. Stone pillars rise into shadow. At the far end, seated on a plain stone chair, is an old man in gray robes — the Steward of the Sword. His eyes burn with quiet power.\n\n"So," he says, rising slowly. "Another bearer. You've come a long way."\n\nThe Sword of Rancor screams. Not in sound, but in feeling — pure resistance coursing through your arm. It doesn't want to be surrendered. It wants to stay with you.\n\nYour hand tightens on the hilt involuntarily. The purple glow is blinding now.\n\nThe Steward extends his hand. "Give me the blade. But I must know you come willingly."`,
    choices: [
      {
        text: "Present the Steward's Seal",
        preview: "The wizard said this was the key.",
        nextNodeId: "finale_oil",
        requiresItem: "stewards_seal",
      },
      {
        text: "Offer the sword by torchlight as a sign of peace",
        preview: "Light against darkness.",
        nextNodeId: "finale_torch",
        requiresItem: "torch",
      },
      {
        text: "Present the eagle feather as proof of your journey",
        preview: "A gift from a creature the Steward may know.",
        nextNodeId: "finale_feather",
        requiresItem: "eagle_feather",
      },
      {
        text: "Try to force the sword from your own grip",
        preview: "Willpower alone. This will hurt.",
        nextNodeId: "finale_force",
        usesSword: true,
        isHighRisk: true,
      },
    ],
  },

  // ============================================================
  // ENDINGS — Wins
  // ============================================================

  finale_oil: {
    id: "finale_oil",
    title: "The Steward Accepts",
    narrative: `You hold out the wax seal. The Steward's eyes widen — then soften. "Theron sent you. I know that mark well."\n\nHe takes the seal, examines it, and nods. "You've carried the blade with honor. Few make it this far with their will intact."\n\nHe extends both hands. The sword fights you — your muscles burn, your hand feels fused to the hilt. But the Steward speaks a word in a language older than the mountains, and the blade goes still.\n\nYou release it. The purple glow fades as the Steward wraps the sword in enchanted cloth and places it in a vault behind his chair — a vault filled with dozens of other cursed weapons, each sealed and silent.\n\n"It will trouble no one again," he says. "Not while I draw breath, nor my successor after me."\n\nThe curse lifts from your shoulders like a physical weight. You breathe freely for the first time since you touched the blade.\n\nAs you walk out of the keep and into the sunlight, the world feels new. Clean.\n\nYou're a hero. And you're free.`,
    isEnding: true,
    endingType: "win",
    choices: [],
  },

  finale_torch: {
    id: "finale_torch",
    title: "A Hard-Won Trust",
    narrative: `You raise the torch — not as a weapon, but as an offering of light. The Steward watches, his expression unreadable.\n\n"No seal," he says. "No proof. Just a torch and a stranger."\n\nBut he studies your face for a long time. The sword resists with everything it has — your arm shakes, sweat pours down your face. The Steward sees the struggle.\n\n"You're fighting it," he says quietly. "That's proof enough."\n\nHe reaches out and grips the blade with bare hands. You expect it to cut him, but it doesn't — his hands glow with a faint silver light. The sword goes limp. Dead. You release the hilt and stagger backward.\n\nThe Steward carries the blade to his vault and seals it away with the others.\n\n"It took courage to come here without the seal," he says. "Most don't make it."\n\nYou collapse in the Steward's hall, exhausted but free. The curse fades slowly, like poison leaving your blood.\n\nIt wasn't perfect. It wasn't easy. But you did it.`,
    isEnding: true,
    endingType: "win",
    choices: [],
  },

  finale_feather: {
    id: "finale_feather",
    title: "Wings of Recognition",
    narrative: `You hold out the eagle's feather. The Steward freezes — then a rare smile crosses his weathered face.\n\n"The Great Eagle," he breathes. "It still watches the roads." He takes the feather and holds it to the light. "This creature has guarded these lands longer than I have. If it trusted you with this, then I trust you completely."\n\nHe extends his hands for the sword. The blade barely resists — as if the eagle's blessing has already weakened its hold on you. You release it easily, almost gently.\n\nThe Steward wraps the blade with practiced care and carries it to his vault. As the vault door closes, you hear the eagle cry somewhere high above — a sound of triumph.\n\n"You've done a remarkable thing," the Steward says. "Go in peace."\n\nYou walk from the keep lighter than you've ever felt. Above you, the great eagle circles once, twice, then soars north and vanishes into the clouds.\n\nThe best ending you could have hoped for.`,
    isEnding: true,
    endingType: "win",
    choices: [],
  },

  finale_force: {
    id: "finale_force",
    title: "Torn Free",
    narrative: `You grip the sword with both hands and try to wrench it away from yourself. The blade fights back — a surge of purple energy courses through your arms, your chest, your skull.\n\nYou scream. The Steward rushes forward, speaking words of power, his hands glowing silver. Together — your willpower and his ancient magic — you force the sword from your grip.\n\nIt clatters to the stone floor, still glowing, still hungry. But it's no longer yours.\n\nThe Steward scoops it up before it can reach for you again, wrapping it in enchanted cloth with practiced speed. The vault door slams shut.\n\nYou lie on the cold stone floor, barely conscious. The purple glow fades from your veins. It's over.\n\nBut you can feel the echoes of its power in your bones. They'll fade, eventually. You hope.\n\nThe Steward helps you to your feet. "You have more courage than sense," he says. "But you're alive. And the blade is contained."\n\nYou walk from the keep wounded and changed, but free. The sword is the Steward's burden now.`,
    isEnding: true,
    endingType: "win",
    choices: [],
  },

  // ============================================================
  // ENDINGS — Losses
  // ============================================================

  lose_refused: {
    id: "lose_refused",
    title: "The Coward's Regret",
    narrative: `You walk away from the sword under the oak tree. It's not your problem. Let someone else be the hero.\n\nBut no one else comes.\n\nWeeks later, a stranger stumbles into your village — wild-eyed and raving, the Sword of Rancor fused to his hand. He cuts through the village like a plague. By the time it's over, everything you loved is ash.\n\nYou survive. You always were good at that. But you carry the weight of knowing you could have stopped it — if only you'd been brave enough to try.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "You refused the call to adventure.",
    choices: [],
  },

  lose_corrupted: {
    id: "lose_corrupted",
    title: "The Price of Greed",
    narrative: `You take the sword to sell. But the moment you enter the market, the blade whispers. You draw it to show a buyer, and the purple light fills your eyes.\n\nYou never make it to the merchant's stall. The sword takes you instead. By nightfall, you're walking north — away from the Steward, away from anyone who could help. The sword has a new bearer, and it has no intention of being surrendered.\n\nYou are the sword's creature now.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "Greed led to corruption.",
    choices: [],
  },

  lose_lost_backtrack: {
    id: "lose_lost_backtrack",
    title: "Time Runs Out",
    narrative: `You follow the merchant's footprints back toward the village, but the trail goes cold. You spend hours searching, then days.\n\nBy the time you give up and try to resume your quest, the sword has grown impatient. Its pull is stronger now, its whispers louder. You feel the curse tightening around you.\n\nYou never make it to the Steward. The sword consumes you on a lonely road, far from anyone who might have helped. Another failed bearer added to its long history.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "You lost too much time and the curse overtook you.",
    choices: [],
  },

  lose_spiders_camp: {
    id: "lose_spiders_camp",
    title: "A Web of Regret",
    narrative: `You make camp in the spider-infested forest. A terrible decision.\n\nYou wake to find yourself cocooned in silk, hanging from a branch. The spiders descend, patient and methodical. The Sword of Rancor lies on the ground below you, just out of reach, its purple glow mocking.\n\nThis was not how your story was supposed to end.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "You camped in dangerous territory.",
    choices: [],
  },

  lose_goblin_ambush: {
    id: "lose_goblin_ambush",
    title: "Greed's Second Visit",
    narrative: `You circle back to steal more from the goblin camp. But they're ready this time. An ambush — arrows from every direction.\n\nYou reach for the sword, but they're too fast, too many. The last thing you see is the goblin chieftain lifting the Sword of Rancor from your fallen body, a terrible grin on its twisted face.\n\nThe sword doesn't care who carries it. It just needs to be carried.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "Greed led you into an ambush.",
    choices: [],
  },

  lose_enchanted: {
    id: "lose_enchanted",
    title: "The Eternal Song",
    narrative: `You sit down. The music is so beautiful. Why were you in such a hurry? The sword doesn't matter. Nothing matters except this song.\n\nDays pass. Weeks. Your body weakens but you don't notice — the music is everything. The flute player smiles, her eyes still closed. She's been playing for centuries, and she'll play for centuries more.\n\nYou join the circle of listeners forever, a peaceful smile on your starving face. The sword lies beside you, patient. It will find another bearer eventually.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "You fell under the enchantment of the singing tunnel.",
    choices: [],
  },

  lose_wizard_curse: {
    id: "lose_wizard_curse",
    title: "A Wizard's Wrath",
    narrative: `You draw the Sword of Rancor on Theron. A terrible mistake.\n\nThe wizard's eyes flash with terrible power. He raises his staff and speaks a single word. The sword freezes in your grip — then begins to glow white-hot. But it doesn't burn the blade. It burns you.\n\n"You draw a cursed sword on someone trying to help you," Theron says, his voice like thunder. "The sword has already won. You just didn't know it yet."\n\nThe rancor gauge fills completely. The sword fuses to your hand. Theron watches sadly as you stumble away, no longer in control.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "You threatened the wrong wizard.",
    choices: [],
  },

  // ============================================================
  // Rancor/Health auto-loss nodes (referenced when gauge fills)
  // ============================================================

  lose_rancor: {
    id: "lose_rancor",
    title: "Consumed by the Blade",
    narrative: `The Sword of Rancor has attached itself to your hand. You can feel it merging with your skin, your bones, your soul.\n\nYou try to fight it. You try to scream. But the sword doesn't care. It has a new host now, and it has no intention of being returned to any forge.\n\nYour eyes glow purple. Your thoughts are no longer your own. You turn south, away from the Mines, and begin to walk. The sword is patient. It has all the time in the world.\n\nAnother bearer consumed. Another hero lost.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "The Sword of Rancor attached itself to you.",
    choices: [],
  },

  lose_health: {
    id: "lose_health",
    title: "Fallen on the Road",
    narrative: `Your body finally gives out. Too many wounds, too little rest, too many battles fought with flesh instead of cursed steel.\n\nYou collapse on the road, the Steward's keep somewhere ahead — close, maybe, but it doesn't matter now. Your vision dims.\n\nThe Sword of Rancor slips from your pack and lands in the dirt beside you, its purple glow steady and patient. It will wait. Someone else will come along. Someone else always does.\n\nYour quest ends here, in the dust and the silence. So close. Not close enough.`,
    isEnding: true,
    endingType: "lose",
    loseReason: "Your health was depleted.",
    choices: [],
  },

  mountain_climb: {
    id: "mountain_climb",
    title: "The Hard Way Up",
    narrative: `You decide to climb over the mountain rather than go through the tunnels. It's brutal — steep rock faces, loose shale, and biting wind.\n\nHalfway up, you realize this was a mistake. The mountain is too high, the climb too difficult. But going back down is just as dangerous as continuing.\n\nYour strength flags. The sword whispers that it could give you energy — just draw it, let its power sustain you. The temptation is almost overwhelming.`,
    choices: [
      {
        text: "Use the rope to secure your climb",
        preview: "Slow and steady.",
        nextNodeId: "wizard_riddles",
        requiresItem: "rope",
        healthChange: -15,
      },
      {
        text: "Draw the sword for strength",
        preview: "Its power could sustain you. But at what cost?",
        nextNodeId: "wizard_riddles",
        rancorChange: 12,
        healthChange: 10,
      },
      {
        text: "Push through on pure willpower",
        preview: "Grit your teeth and climb.",
        nextNodeId: "wizard_riddles",
        healthChange: -25,
      },
      {
        text: "Turn back to the tunnels",
        preview: "Admit defeat and try below.",
        nextNodeId: "sunken_pass_01",
        healthChange: -10,
      },
    ],
  },
};

export function getStoryNode(nodeId: string): StoryNode | undefined {
  return storyNodes[nodeId];
}

export function getAllNodeIds(): string[] {
  return Object.keys(storyNodes);
}
