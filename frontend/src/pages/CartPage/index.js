import { useEffect, useContext } from 'react'
import CartContext from '../../context/CartContext'

import CartItem from '../../components/CartItem'

import Navbar from '../../components/Navbar'

import {
  CartContainer,
  CartHeading,
  CartList,
  EmptyView,
} from './styledComponents'

const CartPage = () => {
  const { cartList, fetchCart } = useContext(CartContext)

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <>
      <Navbar />
      {cartList.length === 0 ? (
        <EmptyView>Your cart is empty</EmptyView>
      ) : (
        <CartContainer>
          <CartHeading>My Cart</CartHeading>
          <CartList>
            {cartList.map((item) => (
              <CartItem key={item.productId._id} item={item} />
            ))}
          </CartList>
        </CartContainer>
      )}
    </>
  )
}

export default CartPage
