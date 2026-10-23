---
author: Rowland
last_updated: 2026-10-23T08:41:12Z
---

# Architecture Design

**Author:** Rowland

## System Overview
Frontend-only **CloudQuest Africa AZ-900** practice platform. The React app defines start, quiz, and results states, backed by original, domain-aligned practice questions and browser-local history. No authentication or shared remote database is required.

## Tech Stack
* **Framework:** React with TypeScript (`.tsx` / `.ts`)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS & shadcn/ui component scaffolding
* **Icons:** `lucide-react`
* **Storage:** Browser `localStorage` for quiz attempts and session history
* **Routing:** Single-page application mounted at `/`

---

## Module Design

| Module | Responsibility | Key Files |
| :--- | :--- | :--- |
| **Quiz Data** | Typed AZ-900 domains, original question pool, randomized question picker, and `localStorage` persistence. | `src/pages/quizData.ts` |
| **Practice App** | Global layout, header, title hero banner, domain selection filters, session progress, and state machine orchestration. | `src/pages/Index.tsx` |
| **Session Views** | Live question views, immediate answer explanations, aggregate score reports, domain-by-domain breakdowns, and answer review/retry controls. | `src/pages/QuizViews.tsx` |
| **Visual System** | Responsive cloud-campus styling tokens, typography, dark/light themes, and design specs. | `src/index.css`<br>`DESIGN.md` |

---

## Tech Decisions

| Decision | Choice | Rationale | Owner |
| :--- | :--- | :--- | :--- |
| **Persistence Layer** | `localStorage` API | Zero backend overhead; users can track personal AZ-900 scores and study history offline directly in their browser. | Rowland |
| **State Management** | React `useState` & `useReducer` | Keeps bundle size minimal without introducing external stores (like Redux or Zustand) for a linear quiz flow. | Rowland |
| **UI Primitives** | Tailwind CSS + Lucide Icons | Matches the Bolt.new / Atoms.dev setup for rapid responsive styling and high-contrast accessibility. | Rowland |
| **Question Sampling** | In-memory Fisher-Yates shuffle | Prevents question repetition while enabling domain-focused drilling or full simulated mock exams. | Rowland |

---

## File Tree Plan

```text
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable shadcn/ui components (buttons, cards, progress bars)
│   │   └── Header.tsx        # Top navigation & branding
│   ├── pages/
│   │   ├── Index.tsx         # Main entry page & state controller
│   │   ├── quizData.ts       # Typed question bank, domain mappings, and storage helpers
│   │   └── QuizViews.tsx     # Active quiz card, review modal, and results view
│   ├── App.tsx               # Root component & route definitions
│   ├── main.tsx              # React DOM bootstrap
│   └── index.css             # Tailwind base, utilities, and theme variables
├── DESIGN.md                 # Design system guidelines
├── architecture.md           # Architecture specifications & decisions
├── package.json              # Project dependencies and npm scripts
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build configuration
```

---

## Implementation Guide

1. **Step 1: Define Models & Questions (`src/pages/quizData.ts`)**
   * Define TypeScript interfaces: `Question`, `Domain`, `QuizSession`, and `AttemptRecord`.
   * Populate categorized AZ-900 domain questions (Cloud Concepts, Architecture & Services, Management & Governance).
   * Implement `loadHistory()` and `saveAttempt()` utilities wrapping `localStorage`.

2. **Step 2: Build View Components (`src/pages/QuizViews.tsx`)**
   * Build `QuestionCard`: displays active prompt, options, and instant rationales.
   * Build `ResultsSummary`: visual score meter, pass/fail badge, domain breakdown cards, and retry triggers.
   * Build `ReviewDrawer`: lets students re-read missed questions alongside explanation notes.

3. **Step 3: Wire Controller State (`src/pages/Index.tsx`)**
   * Implement top-level view state machine: `'IDLE' | 'PRACTICING' | 'SUMMARY'`.
   * Bind domain filter pills and "Start Quiz" actions to sample questions from `quizData.ts`.
   * Feed selected answers into active session state and commit completed runs to local storage.