import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { LanguageProvider } from './context/LanguageContext'
import AppRoutes from './routes/AppRoutes'
import SessionManager from './components/common/SessionManager'
import { Toaster } from 'react-hot-toast'
import './i18n/config'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <NotificationProvider>
          <AuthProvider>
            <AppRoutes />
            <SessionManager />
            <Toaster position="top-right" />
          </AuthProvider>
        </NotificationProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
