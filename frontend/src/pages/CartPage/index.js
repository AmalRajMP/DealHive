import { useContext } from 'react'
import CartContext from '../../context/CartContext'
import CartItem from '../../components/CartItem'
import { CartContainer, CartList, EmptyView } from './styledComponents'

const CartPage = () => {
  const { cartList } = useContext(CartContext)

  if (cartList.length === 0) {
    return <EmptyView>Your cart is empty</EmptyView>
  }

  return (
    <CartContainer>
      <CartList>
        {cartList.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </CartList>
    </CartContainer>
  )
}

export default CartPage
