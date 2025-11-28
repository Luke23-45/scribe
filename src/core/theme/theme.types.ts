export type Mode = 'draft' | 'audit';

export interface Theme {
  mode: Mode;
  
  colors: {
    // Canvas: The desk/background
    background: string;       
    // Surface: The card/paper sitting on the desk
    surface: string;          
    
    // Ink: Typography colors
    ink: {
      primary: string;        // Main text (Deep charcoal)
      secondary: string;      // Subtitles (Warm Stone)
      tertiary: string;       // Lines/Borders (Mist)
    };

    // Functional
    accent: string;           // Spiritual color (Sage)
    highlight: string;        // Hover states
    panic: string;            // The TK button
    success: string;          // Completion
  };

  typography: {
    fontDisplay: string;      // Fraunces (Headings)
    fontBody: string;         // Inter (UI)
    fontSize: {
      hero: string;
      heading: string;
      subheading: string;
      body: string;
      small: string;
    };
  };

  visuals: {
    // Physics: Shadow depth represents elevation
    shadow: {
      resting: string;        // Flat on desk
      hover: string;          // Lifted slightly
      floating: string;       // High elevation
    };
    radius: string;           // Element roundness
    transition: string;       // Smooth physics speed
  };
}