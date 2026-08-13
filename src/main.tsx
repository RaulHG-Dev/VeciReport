import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FirstStepsApp } from './components/FirstStepsApp'
import { MyAwesomeApp } from './components/MyAwesomeApp'
import { ItemProps } from './components/ItemProps'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstStepsApp />
    <MyAwesomeApp />
    <ItemProps data="Este es un dato" />
  </StrictMode>,
)
