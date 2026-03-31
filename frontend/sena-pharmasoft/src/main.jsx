import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import '../src/styles/global.css'
import './styles/global.css'
import App from './app/App.jsx'
import './shared/services/axiosConfig.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)