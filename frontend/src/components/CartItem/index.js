import { useContext } from 'react'
import CartContext from '../../context/CartContext'
import {
  ItemContainer,
  ItemImage,
  ItemInfo,
  Title,
  Price,
  QuantityContainer,
  QtyButton,
  QtyText,
  RemoveButton,
} from './styledComponents'

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext)

  const { _id, title, image, price, quantity } = item

  return (
    <ItemContainer>
      <ItemImage src={image} alt={title} />

      <ItemInfo>
        <Title>{title}</Title>
        <Price>₹ {price}</Price>

        <QuantityContainer>
          <QtyButton onClick={() => decreaseQuantity(_id)}>-</QtyButton>
          <QtyText>{quantity}</QtyText>
          <QtyButton onClick={() => increaseQuantity(_id)}>+</QtyButton>
        </QuantityContainer>

        <RemoveButton onClick={() => removeFromCart(_id)}>Remove</RemoveButton>
      </ItemInfo>
    </ItemContainer>
  )
}

export default CartItem
