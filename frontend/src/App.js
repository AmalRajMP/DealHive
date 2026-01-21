import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        localStorage.getItem('authToken') ? (
          <Navigate to="/home" />
        ) : (
          <LandingPage />
        )
      }
    />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegistrationPage />} />
    <Route
      path="/home"
      element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }
    />
  </Routes>
)

export default App
