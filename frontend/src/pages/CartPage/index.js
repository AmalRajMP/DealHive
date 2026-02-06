import { useEffect, useContext } from 'react'
import CartContext from '../../context/CartContext'
import CartItem from '../../components/CartItem'

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
  }, [])

  if (cartList.length === 0) {
    return <EmptyView>Your cart is empty</EmptyView>
  }

  return (
    <CartContainer>
      <CartHeading>My Cart</CartHeading>
      <CartList>
        {cartList.map((item) => (
          <CartItem key={item.productId._id} item={item} />
        ))}
      </CartList>
    </CartContainer>
  )
}

export default CartPage
