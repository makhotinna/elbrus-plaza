import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './pagers/MainPage/Main.css'
import { BookingProvider } from './contexts/BookingContext'

createRoot(document.getElementById('root')!).render(
  <BookingProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </BookingProvider>

)
