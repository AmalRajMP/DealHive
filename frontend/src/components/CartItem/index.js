import { useContext } from 'react'

import { FaTrash } from 'react-icons/fa'

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

  const { quantity, productId } = item
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
      </ItemInfo>
      <RemoveButton onClick={() => removeFromCart(productId._id)}>
        <FaTrash size={14} />
      </RemoveButton>
    </ItemContainer>
  )
}

export default CartItem
