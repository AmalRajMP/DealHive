import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import ProductItemDetails from './components/ProductItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'

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
    <Route
      path="/products/:id"
      element={
        <ProtectedRoute>
          <ProductItemDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <CartPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/wishlist"
      element={
        <ProtectedRoute>
          <WishlistPage />
        </ProtectedRoute>
      }
    />
  </Routes>
)

export default App
