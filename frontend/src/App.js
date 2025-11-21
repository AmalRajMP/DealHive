import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

const App = () => (
  <Routes>
    <Route path="/" element={<RegistrationPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
)

export default App
