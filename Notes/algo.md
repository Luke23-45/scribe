This represents the algorithmic core of the **Prosthetic Engine**.

We are implementing a **"Locked-Rail" Text Engine**. Unlike a standard text editor (which is "Free Roam"), this engine only permits forward movement when the neurological condition `Input === Expected` is met.

### **The Data Model (State Machine)**

We separate the "True Reality" (the source text) from the "User Reality" (what they have typed).

```typescript
type WordStatus = 'LOCKED' | 'ACTIVE' | 'DONE';

interface MicroSlicerState {
    sourceText: string;        // The immutable "Truth"
    userBuffer: string;        // What the user has successfully typed
    cursorIndex: number;       // The exact char position (Playhead)
    
    // The Prosthetic State
    activeWordIndex: number;   // Which word are we currently "repairing"?
    windowRange: [number, number]; // [StartWordIndex, EndWordIndex]
    
    // Safety Valve
    isPanicMode: boolean;      // Did they hit TK?
}
```

---

### **The Core Algorithm: `handleKeystroke(key)`**

This logic replaces the browser's native `<input>` behavior. We capture the keydown, validate it, and *then* manually update the state.

```pseudocode
FUNCTION handleKeystroke(key):
    // 1. INPUT SANITIZATION
    IF key is "Control" OR "Shift" OR "Alt": RETURN (Ignore modifiers)
    
    // 2. THE "TK" BYPASS (Panic Button)
    IF key == "Ctrl+Space" OR key == "TK_Button_Click":
        INSERT "[TK]" into userBuffer
        ADVANCE cursorIndex by length of current target word
        TRIGGER function JumpToNextWord()
        RETURN

    // 3. TARGET ACQUISITION
    LET expectedChar = sourceText[cursorIndex]

    // 4. THE NEURO-VALIDATION GATE
    IF key == expectedChar:
        // -- SUCCESS PATH --
        APPEND key to userBuffer
        INCREMENT cursorIndex
        
        // Did we finish a word?
        IF key == " " (Spacebar):
            TRIGGER SlideWindow()
            TRIGGER PlayAudio(PreviousWord) // Ear-to-Eye Sync

    ELSE:
        // -- FAILURE PATH (The Prosthetic Brace) --
        // DO NOT append key. 
        // DO NOT flash red.
        
        VISUAL EFFECT: "Pulse" the word at [activeWordIndex]
        AUDIO EFFECT: Null (Silence is the feedback) OR faint "Thud"
        RETURN (State remains frozen)

END FUNCTION
```

---

### **The Sliding Logic: `SlideWindow()`**

This calculates exactly what the user is allowed to see. This is the **"Visual RAM Restrictor."**

**The Rules:**
*   **The Past:** Dimmed (Opacity 0.5), blur(0.5px).
*   **The Present:** Sharp, Large Scale (1.2x).
*   **The Future:** Hidden or blurred (Gaussian Blur 4px) to prevent "read-ahead anxiety."

```pseudocode
FUNCTION renderVisibleWindow(activeWordIndex, allWords):
    // We strictly limit the loop to conserve browser paint resources
    // The "Window" is dynamic: Words [Active - 1] to [Active + 2]
    
    LET startView = MAX(0, activeWordIndex - 1)
    LET endView = MIN(allWords.length, activeWordIndex + 3)

    FOR i FROM 0 TO allWords.length:
        LET word = allWords[i]
        
        IF i < activeWordIndex:
            status = "DONE" (Render as faint gray)
            
        ELSE IF i == activeWordIndex:
            status = "ACTIVE" (Render as High Contrast, Scale 1.2)
            // This is the only place typing matches occur
            
        ELSE IF i > endView:
            status = "HIDDEN" (Opacity 0, or Render as "..." placeholder)
            
        ELSE:
             status = "LOCKED" (Render as Blur 4px, Prevent reading)
             
    RETURN StyledComponents<WordSpan> based on status
END FUNCTION
```

---

### **The Component Implementation Plan**

Based on this logic, here is the React implementation hierarchy.

**1. The "Ghost" Input**
We will not use a `contentEditable` div. We will use a transparent `<input>` overlaid on the screen to capture mobile keyboard events, but the User Interface will be purely a mapped array of `<span>` elements.

**2. File Structure for this Logic**
*   **`/src/logic/hooks/useTyperEngine.ts`**: Contains the big reducer function derived from the pseudocode above.
*   **`/src/components/molecules/FocusWindow/Word.tsx`**: A memoized component that only re-renders when its specific status (`LOCKED` $\to$ `ACTIVE`) changes.

**3. Next Step:**
Do you want me to write the actual **Typescript Hook (`useTyperEngine`)** first, or start building the **Visual Component (`Word.tsx`)** to see the "Blur Effect" in action?