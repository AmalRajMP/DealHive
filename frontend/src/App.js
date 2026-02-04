import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import ProductItemDetails from './components/ProductItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import CartPage from './pages/CartPage'

import CartContext from './context/CartContext'

const App = () => {
  const [cartList, setCartList] = useState([])

  useEffect(() => {
    console.log('CART UPDATED:', cartList)
  }, [cartList])

  const addToCart = async (product) => {
    setCartList((prevCartList) => {
      const isItemPresent = prevCartList.find(
        (item) => item._id === product._id,
      )

      if (isItemPresent) {
        return prevCartList.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...prevCartList,
        {
          ...product,
          quantity: 1,
        },
      ]
    })

    try {
      const url = 'http://localhost:5000/api/cart/add'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId: product._id,
        }),
      }
      await fetch(url, options)
    } catch (e) {
      console.error(e)
    }
  }

  const removeFromCart = (id) => {
    setCartList((prevCartList) =>
      prevCartList.filter((item) => item._id !== id),
    )
  }

  const increaseQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const decreaseQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
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
      </Routes>
    </CartContext.Provider>
  )
}

export default App
