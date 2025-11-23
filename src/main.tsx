import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { TimeProvider } from './context/TimeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TimeProvider>
        <App />
      </TimeProvider>
    </BrowserRouter>
  </StrictMode>,
)
