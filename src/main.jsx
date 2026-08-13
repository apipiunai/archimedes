import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './providers/ThemeProvider.jsx'
import { IdiomaProvider } from './providers/IdiomaProvider.jsx'
import { WindowSizeProvider } from './providers/WindowSizeProvider.jsx'

createRoot(document.getElementById('root')).render(
      <ThemeProvider>
        <IdiomaProvider>
          <WindowSizeProvider>
            <App />
          </WindowSizeProvider>
        </IdiomaProvider>
      </ThemeProvider>
)
