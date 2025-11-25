This is a sophisticated architectural decision. Shifting from **Tailwind** to **Styled Components** allows us to enforce "Medical-Grade" UI constraints.

For a Cognitive Prosthetic, "visual feel" is not just styling—it is part of the functional requirement. Styled Components allows us to bind the **Application State** (e.g., "Panic Mode" vs. "Focus Mode") directly to the **CSS Logic** without relying on messy class-name toggling.

Here is the **Finalized Architecture Plan (Phase 1)** tailored for `styled-components` and strictly typed logic.

---

### 1. The Refined Tech Stack (Logic & Precision Focused)

*   **Build Tool:** `Vite` (Preserving the instant Hot Module Replacement).
*   **Core Framework:** `React 18` + `TypeScript` (Strict Mode).
*   **Styling Engine:** `Styled-Components` (v6+).
    *   *Reasoning:* We can utilize the `ThemeProvider` to wrap the entire app. The **"Visual Shock"** feature becomes a global theme swap (replacing the entire variable set from "Soft/Focus" to "Sharp/Audit") rather than just swapping CSS classes.
*   **CSS Utility:** `Polished`.
    *   *Add-on:* A lightweight toolset for Styled Components. It allows us to mathematically "soften" colors (e.g., `transparentize(0.5, theme.colors.text)`) to programmatically ensure contrast ratios never trigger anxiety/sensory overload.
*   **State Management:** `Zustand`.
*   **Audio Engine:** `useSound` or Native `Web Speech API`.
*   **Inputs:** `react-hotkeys-hook` (For the `TK` button).

---

### 2. The "Theme-Driven" Strategy (The Visual Shock Engine)

This is the biggest change. Instead of hardcoding classes, we define strict TypeScript interfaces for our "Brain Modes."

**We will have two distinct theme objects in code:**

1.  **`draftTheme.ts` (Zero Anxiety)**
    *   *Typography:* Sans-Serif (Inter/Roboto), 1.5 Line Height.
    *   *Colors:* Sage Green, Pale Slate, Transparent Orange (for warnings).
    *   *Behavior:* Soft transitions, rounded corners.
2.  **`auditTheme.ts` (Visual Shock)**
    *   *Typography:* Monospace (Courier Prime), 24pt, 2.0 Line Height.
    *   *Colors:* High Contrast Black on Yellow Background.
    *   *Behavior:* Sharp edges, zero blurs.

*Implementation Logic:*
The `<ToggleSwitch />` will simply update the Global Store, which swaps the theme object passed to `<ThemeProvider>`. Every component instantly "reacts" and transforms.

---

### 3. The Directory Structure (Modular & Atomic)

We will use a **"Colocation" pattern**. Logic, View, and Style sit together.

```text
/src
│
├── /app
│   ├── App.tsx                    # Main Entry & ThemeProvider Wrapper
│   └── Router.tsx
│
├── /assets                        # Fonts (Courier Prime) & Icons
│
├── /components
│   ├── /atoms
│   │   ├── ButtonTK.tsx           # Logic: The Panic Trigger
│   │   ├── ButtonTK.styles.ts     # Style: The physical appearance
│   │   ├── Toggle.tsx
│   │   └── Toggle.styles.ts
│   │
│   ├── /molecules
│   │   ├── FocusWindow.tsx        # Logic: Calculates indices
│   │   ├── FocusWindow.styles.ts  # Style: Handles the "Blur" effect props
│   │   └── ActiveEcho.tsx         # Headless Component (Audio)
│   │
│   └── /organisms
│       ├── TheRehabWorkspace.tsx  # Layout: Combines Input + Window
│       └── VisualShockReview.tsx  # Layout: The large-text review mode
│
├── /logic (The Prosthetic Brain)
│   ├── /hooks
│   │   ├── useMicroSlicer.ts      # The "3-Word Window" algorithm
│   │   ├── useSessionState.ts     # Zustand: Foggy vs Sharp
│   │   └── useHotkeysHandler.ts   # Intercepts Ctrl+Space
│   │
│   └── /utils
│       └── textProcessor.ts       # String matching/slicing utilities
│
├── /styles (Global Design System)
│   ├── GlobalStyles.ts            # CSS Resets (No red focus rings!)
│   ├── theme.types.ts             # TS Definitions for the theme
│   ├── draftTheme.ts              # "Soft Mode" values
│   └── auditTheme.ts              # "Shock Mode" values
│
└── main.tsx
```

---

### 4. Logic & Styling Deep Dive

This is how Styled Components gives us the control we need over the **"Blur"** mechanism.

#### **A. The `MicroSlicer` Logic (Hook)**
*Located in `/hooks/useMicroSlicer.ts`*
```typescript
// This handles the state, detached from UI
export const useMicroSlicer = (fullText: string) => {
    const [buffer, setBuffer] = useState("");
    // We only expose the specific slice the user is allowed to see
    // This reduces "State Overhead" for the renderer
    const windowStart = Math.max(0, buffer.length - 10);
    const visibleSlice = fullText.slice(windowStart, windowStart + 30);
    
    // Returns logic
    return { buffer, visibleSlice, validateChar, ... };
};
```

#### **B. The Styled Component (Visual Implementation)**
*Located in `/components/molecules/FocusWindow.styles.ts`*
We can now enforce the "Blur" logic dynamically based on prop inputs.

```typescript
import styled, { css } from 'styled-components';

interface WordProps {
  $isTarget: boolean;  // "$" denotes transient prop (not passed to DOM)
  $isPast: boolean;
}

export const WordDisplay = styled.span<WordProps>`
  transition: all 0.3s ease; // Gentle transition (No flashing)
  display: inline-block;
  margin-right: 0.5rem;

  /* The Logic of "The Window" via CSS */
  ${(props) => {
    if (props.$isTarget) {
        return css`
           opacity: 1;
           font-weight: 700;
           transform: scale(1.05);
           color: ${props.theme.colors.primaryText};
        `;
    }
    if (props.$isPast) {
        return css`
           opacity: 0.5;
           color: ${props.theme.colors.subtleText};
           filter: blur(0.5px);
        `;
    }
    // Future words (blurred)
    return css`
        opacity: 0.2;
        filter: blur(4px);
        user-select: none; /* User cannot cheat by copying */
    `;
  }}
`;
```

---

### 5. Final Checklist before Coding

We are effectively building a **Text-Processing State Machine**.
1.  **Restriction:** The user can only type *one* character.
2.  **Validation:** Logic checks character against reference.
3.  **Visual:** Styled Component receives validation result $\rightarrow$ Updates CSS.

**Are we ready to initialize the repo?**
If yes, I will provide the commands to scaffolding the project, install the dependencies, and write the initial `theme.types.ts` and `useMicroSlicer.ts` to get the core engine running.