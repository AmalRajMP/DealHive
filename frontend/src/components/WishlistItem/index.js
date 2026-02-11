import { useContext } from 'react'

import WishlistContext from '../../context/WishlistContext'
import CartContext from '../../context/CartContext'

import {
  Item,
  ItemImage,
  ItemDetails,
  ItemTitle,
  ItemPrice,
  ActionRow,
  MoveToCartButton,
  RemoveButton,
} from './styledComponents'

const WishlistItem = ({ item }) => {
  const { removeFromWishList } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  const product = item.productId

  const onMoveToCart = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      image: product.thumbnail,
      price: product.discountPrice,
    })

    removeFromWishList(product._id)
  }

  return (
    <Item>
      <ItemImage src={product.thumbnail} alt={product.title} />

      <ItemDetails>
        <ItemTitle>{product.title}</ItemTitle>
        <ItemPrice>₹{product.discountPrice}</ItemPrice>

        <ActionRow>
          <MoveToCartButton type="button" onClick={onMoveToCart}>
            Move to Cart
          </MoveToCartButton>

          <RemoveButton
            type="button"
            onClick={() => removeFromWishList(product._id)}
          >
            Remove
          </RemoveButton>
        </ActionRow>
      </ItemDetails>
    </Item>
  )
}

export default WishlistItem
