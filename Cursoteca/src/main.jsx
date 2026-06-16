import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UsuarioProvider } from './context/UsuarioProvider.jsx'
//import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
      {/* <ThemeProvider> */}
       <App />
      {/* </ThemeProvider> */}
    </UsuarioProvider>
  </StrictMode>,
)
