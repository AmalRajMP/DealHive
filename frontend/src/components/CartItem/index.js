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

  const { _id, quantity, productId } = item
  const { title, thumbnail, discountPrice } = productId

  return (
    <ItemContainer>
      <ItemImage src={thumbnail} alt={title} />

      <ItemInfo>
        <Title>{title}</Title>
        <Price>₹ {discountPrice}</Price>

        <QuantityContainer>
          <QtyButton onClick={() => decreaseQuantity(productId._id)}>
            -
          </QtyButton>
          <QtyText>{quantity}</QtyText>
          <QtyButton onClick={() => increaseQuantity(productId._id)}>
            +
          </QtyButton>
        </QuantityContainer>

        <RemoveButton onClick={() => removeFromCart(productId._id)}>
          Remove
        </RemoveButton>
      </ItemInfo>
    </ItemContainer>
  )
}

export default CartItem
