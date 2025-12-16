import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './themes/yggdrasil-light-compiled.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './styles/app.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
