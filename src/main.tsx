import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myRouter from './router'
import { SettingsProvider } from './context/settingsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SettingsProvider defaultTheme="light" defaultLanguage='en' defaultSound='on'>
      <RouterProvider router={myRouter} />
    </SettingsProvider>
)
