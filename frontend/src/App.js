import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import ProductItemDetails from './components/ProductItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddProduct from './pages/admin/AddProduct'
import Checkout from './pages/Checkout'
import UserDetails from './pages/UserDetails'

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
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/admin/*" element={<AdminDashboard />} />
    <Route path="/admin/add-product" element={<AddProduct />} />
    <Route path="/profile" element={<UserDetails />} />
  </Routes>
)

export default App
