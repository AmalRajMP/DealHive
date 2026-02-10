import { createContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([])

  const fetchCart = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) return

      const res = await fetch(`http://localhost:5000/api/cart/user/${userId}`)
      const data = await res.json()
      setCartList(data)
    } catch (error) {
      console.error('Fetch cart failed:', error)
    }
  }

  const addToCart = async (product) => {
    try {
      await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId: product._id,
        }),
      })
      fetchCart()
    } catch (error) {
      console.error('Add to cart failed:', error)
    }
  }

  const removeFromCart = async (id) => {
    try {
      await fetch('http://localhost:5000/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId: id,
        }),
      })
      fetchCart()
    } catch (error) {
      console.error('Remove from cart failed:', error)
    }
  }

  const increaseQuantity = async (id) => {
    try {
      await fetch('http://localhost:5000/api/cart/update-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId: id,
          change: 1,
        }),
      })
      fetchCart()
    } catch (error) {
      console.error('Increase quantity failed:', error)
    }
  }

  const decreaseQuantity = async (id) => {
    try {
      await fetch('http://localhost:5000/api/cart/update-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId: id,
          change: -1,
        }),
      })
      fetchCart()
    } catch (error) {
      console.error('Decrease quantity failed:', error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartList,
        fetchCart,
        addToCart,
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
