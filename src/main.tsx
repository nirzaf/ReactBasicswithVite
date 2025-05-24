import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProgressProvider } from './ProgressContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </React.StrictMode>,
)
