# Live project:

https://office-mayhem-aqis.vercel.app/

# 🌵 Brawl Stars Encounter Simulator & i18n Engine 🌵

Welcome to the ultimate, web-based arena where code meets chaos! This project is a high-octane **Encounter Simulator and Advanced Localization Engine** built from the ground up using React, TypeScript, and Vite.

No clunky game engines here. We built our own custom state loop to orchestrate battles, manage active dynamic scenes, and serve flawless localized text faster than Max with her Super active! ⚡

---

## 🕹️ What’s Inside the Starr Park of Code?

- **`useGameEngine.tsx` (The Brawler Mind):** The core loop driving player states, ammo cooldowns, active multipliers, and encounter lifecycle triggers.
- **`SceneManager.tsx` (The Map Maker):** A zero-latency visual router that seamlessly mounts and unmounts screens (Menu ➡️ Encounter Room ➡️ Boss Battle ➡️ Final Result) without dropping a single frame or leaking memory.
- **`useLanguage.ts` (The Global Voice):** An advanced internationalization (i18n) layer built for real-world gaming constraints, packing dynamic token interpolation and robust gender-neutral / inclusive syntax adaptations.
- **`evaluation.Utils.ts` (The Match MVP):** Pure, battle-tested functional utilities that crunch player performance data to calculate final scores and tiers.

---

## 🚀 Technical Showdown

### 🧹 Refactoring Log

To keep the codebase lean and mean, we recently did a major balancing patch:

- **Flattened Directory Tree:** Melted down deep legacy paths like `src/components/Encounters/` directly into a sleek, component-driven layout (`src/components/`). Say goodbye to dependency hell and deep relative imports!
- **Zero Code Zombies:** Integrated **Fallow** (a lightning-fast Rust static analyzer) to hunt down dead code, wipe out circular dependencies, and keep our bundles as sharp as Leon’s blades.

### 📜 Advanced i18n Magic

Unlike standard business apps, gaming text needs to breathe and feel natural. Our custom localization engine ensures that strings like:
`"O brawler {playerName} derrotou o chefe em {timeElapsed}s!"`
are resolved in real-time, matching complex grammatical targets (like Brazilian Portuguese) and utilizing strict inclusive language structures without duplicating asset dictionaries.

---

## 🛠️ The Gadgets & Star Powers (Tech Stack)

- **Core Framework:** React 18 (Hooks-heavy architecture)
- **Type Safety:** TypeScript 5 (Strict definitions via `src/types/game.ts`)
- **Build Tool:** Vite (For hyper-fast Hot Module Replacement)
- **Quality Assurance:** Fallow & npm tree-cli

---

## 🎮 How to Enter the Match

### 1. Clone the Map

```bash
git clone [https://github.com/YourUsername/BrawlStarsAPI.git](https://github.com/YourUsername/BrawlStarsAPI.git)
cd BrawlStarsAPI
```
