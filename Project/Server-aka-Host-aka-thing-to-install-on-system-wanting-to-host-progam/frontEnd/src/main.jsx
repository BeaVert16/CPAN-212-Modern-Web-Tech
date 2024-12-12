import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IsLoggedInCheck from './auth/IsLoggedInCheck.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IsLoggedInCheck>
    <App />
    </IsLoggedInCheck>
  </StrictMode>,
)
