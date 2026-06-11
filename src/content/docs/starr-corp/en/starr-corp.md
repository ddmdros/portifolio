# Starr Corp: Office Mayhem Documentation

**Author:** Diogo de Souza Medeiros  
**Last modified:** 06/08/2026  
**Main technologies used:** React, TypeScript

---

## 1. Introduction

### Overview

**Starr Corp: Office Mayhem** is an interactive web game of strategy and narrative set in a chaotic corporate environment. In this project, Mina acts as an HR representative and tries to contain workplace crises.

### Architectural Rationale

The project was developed as a case study to put technical knowledge in **React 18, TypeScript 5, Vite, and Node.js** into practice. The application requires the orchestration of multiple game states, dynamic scene routing, and complex localization, resulting in a highly modular and reactive web runtime environment that strictly separates business simulation logic from visual rendering.

### Dynamics and Usability Flow

In the main dynamics, the user assumes the leadership role to recruit a task force and manage a crisis. The idealized flow includes:

- **Recruitment:** The player must assemble a team and strategically select three specialists from different classes.
  ![Recruitment Interface](/assets/projects/project_1/p1_1.jpeg)
- **Encounters (Crises):** Facing routine problems (e.g., corporate elevator incidents), where the player must analyze data and make decisions.
  ![Encounter Room](/assets/projects/project_1/p1_2.jpeg)
- **Resource Management:** Monitoring the "Office Chaos" metric, which dictates a game over if it reaches 100%.
  ![Chaos Management](/assets/projects/project_1/p1_6_office_chaos.png)
- ***

## 2. Data Architecture and State Control

The Office Mayhem ecosystem follows the Single Responsibility Principle (SRP), isolating the state machine, deterministic scoring utilities, and presentation components.

### Logical Engine and Scene Routing

1. **useGameEngine (Simulation Engine):** Foundational hook acting as a non-opinionated state machine. It tracks player metrics (chaos level, current scene, etc.), intercepts transition triggers, and compiles raw gameplay parameters for the final evaluation.
2. **SceneManager (Scene Orchestrator):** Acts as a high-performance linear router. It evaluates `GameState` variables (e.g., `INTRO_DIALOGUE`, `ENCOUNTER`, `RESULT`) to render specific modules. This architecture avoids heavy third-party routing abstractions and eliminates memory leaks and rendering overlaps.

```typescript
// Simulation engine abstraction example (useGameEngine)
export const useGameEngine = () => {
  const [chaos, setChaos] = useState(0);

  const handleChoice = (result: ChoiceResult) => {
    // Process chaos points and progression deterministically
    setChaos((prev) => prev + result.chaosValue);
  };

  return { chaos, handleChoice };
};
```

---

## 3. Internationalization and Inclusive Language

One of the project's technical differentiators is its production-ready internationalization (i18n) architecture (`useLanguage.ts`). Instead of relying on rigid dictionaries, the localization engine was designed with game industry professional standards to accommodate the grammatical complexities of both Brazilian Portuguese and English.

- **Dynamic Token Interpolation:** The system scans translation nodes for structural tokens and dynamically injects state contexts in real time (e.g., changing verb tenses and punctuation).
- **Gender-Neutral Adaptation:** The architecture ensures the strict application of inclusive language guidelines. The framework dynamically resolves the swap of noun suffixes, adjectives, and descriptive tags based on profile configurations, maintaining syntactic naturalness without duplicating dictionary asset files.

---

## 4. Code Quality and Technical Specifications

To keep distribution packages light and ensure runtime integrity, the code undergoes strict analysis pipelines:

- **Strongly Typed Contracts (`game.ts`):** All character structures, evaluation reports, and game states are bound to strict interfaces, preventing semantic mismatches at compile time.
  ```text
  export interface Brawler {
  id: number;
  name: string;
  link: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  class: BrawlerClass;
  encounters: EncounterAction[];
  isUsed?: boolean;
  description?: string;
  description_ptbr?: string;
  className?: string;
  classColor?: string;
  iconUrl?: string;
  }
  ```
- **Static Analysis (Fallow):** The codebase uses Fallow (a Rust-based tool) for deep audits, identifying circular dependencies between hooks and ensuring dead code elimination during refactoring.

| Layer / Component     | Technology      | Technical Rationale                                                                               |
| :-------------------- | :-------------- | :------------------------------------------------------------------------------------------------ |
| **Frontend**          | React 18 / Vite | Solid SPA foundation with aggressive bundle optimization and instant hot-reload.                  |
| **Security & Typing** | TypeScript 5    | Strict data contracts (`game.ts`) for attributes and compile-time validation.                     |
| **Logical Control**   | Custom Hooks    | Decoupling the manipulation of iterative states (points, choice arrays).                          |
| **Styling**           | Modular CSS3    | Native and extensive use of keyframes and logical properties without preprocessor overhead.       |

---

## 5. Project Structure

The project architecture follows a flat modular organization pattern (*flat directory pattern*), preventing deep relative dependencies and separating business logic from static content files:

```text
portifolio/
 ┣ public/assets/       # Static assets served at the root (Images)
 ┣ src/
 ┃ ┣ components/        # Consolidated and modular UI components
 ┃ ┣ content/           # Content core and static dictionaries
 ┃ ┃ ┣ docs/            # Markdown files (detailed documentation)
 ┃ ┃ ┣ pages/           # Docs processing and rendering logic
 ┃ ┃ ┗ ProjectsData.ts  # Typed portfolio metadata
 ┃ ┣ hooks/             # State engines (SceneManager, useGameEngine)
 ┃ ┣ i18n/              # Localization configuration, messages, and rules
 ┃ ┣ types/             # Global interfaces and contracts (TypeScript)
 ┃ ┗ utils/             # Pure evaluation and scoring algorithms
 ┗ vite.config.ts       # Packaging and environment settings
```

---

## 6. Gameplay Loop

Check out the gameplay loop demo video below showing the main features of Starr Corp: Office Mayhem:

<iframe src="https://www.youtube.com/embed/Axfj9Brnzhg" title="Gameplay Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 7. Next Steps and Future Improvements

- **Backend Scalability:** Evolving the current static layer (`api.ts`) into an active database infrastructure capable of retrieving leaderboards and managing user session instances.
- **Pure Algorithms:** Expanding the `evaluation.Utils.ts` module with new penalty mechanics, ensuring that final metric calculation remains computationally cheap and 100% unit-testable.
- **Audiovisual Fidelity:** Adding sound feedback for UI clicks and improving vector responsiveness when displaying cards during the recruitment phase.
