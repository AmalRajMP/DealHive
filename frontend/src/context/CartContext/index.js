import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})

export default CartContext
