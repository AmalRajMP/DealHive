import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import LandingPage from './pages/LandingPage'

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    {/* <Route path="/" element={<RegistrationPage />} /> */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegistrationPage />} />
  </Routes>
)

export default App
