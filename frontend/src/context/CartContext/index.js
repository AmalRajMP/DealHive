import { createContext, useState, useCallback } from 'react'

import authFetch from '../../utils/authFetch'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([])

  const fetchCart = useCallback(async () => {
    try {
      const res = await authFetch('http://localhost:5000/api/cart')

      if (!res.ok) {
        throw new Error('Failed to fetch cart')
      }

      const data = await res.json()
      setCartList(data)
    } catch (error) {
      console.error('Fetch cart failed:', error)
      throw error
    }
  }, [])

  const addToCart = async (product) => {
    try {
      await authFetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
        }),
      })
      await fetchCart()
    } catch (error) {
      console.error('Add to cart failed:', error)
    }
  }

  const addMultipleToCart = async (wishList) => {
    try {
      const formattedWishList = wishList.map((item) => ({
        productId: item.productId._id,
      }))

      const url = 'http://localhost:5000/api/cart/add-multiple'
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishList: formattedWishList }),
      }

      await authFetch(url, options)
      await fetchCart()
    } catch (error) {
      console.error('Add to cart failed:', error)
    }
  }

  const removeFromCart = async (id) => {
    try {
      await authFetch('http://localhost:5000/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
        }),
      })

      await fetchCart()
    } catch (error) {
      console.error('Remove from cart failed:', error)
    }
  }

  const increaseQuantity = async (id) => {
    try {
      await authFetch('http://localhost:5000/api/cart/update-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          change: 1,
        }),
      })

      await fetchCart()
    } catch (error) {
      console.error('Increase quantity failed:', error)
    }
  }

  const decreaseQuantity = async (id) => {
    try {
      await authFetch('http://localhost:5000/api/cart/update-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          change: -1,
        }),
      })

      await fetchCart()
    } catch (error) {
      console.error('Decrease quantity failed:', error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        fetchCart,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
