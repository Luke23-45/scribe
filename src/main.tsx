import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { App } from './app/App'
import { draftTheme } from './core/theme/draftTheme'
import { GlobalStyles } from './core/theme/GlobalStyles'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={draftTheme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
