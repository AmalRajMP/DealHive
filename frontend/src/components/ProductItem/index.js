import { Link } from 'react-router-dom'

import {
  ProductCard,
  ImageWrapper,
  ProductImage,
  DiscountBadge,
  AIPickBadge,
  ProductTitle,
  PriceRow,
  DiscountPrice,
  OriginalPrice,
} from './styledComponents'

const ProductItem = (props) => {
  const { productDetails } = props
  const {
    _id,
    title,
    thumbnail,
    originalPrice,
    discountPrice,
    discountPercent,
    why,
  } = productDetails

  const isAiPick = !!why
  return (
    <Link to={`/products/${_id}`} style={{ textDecoration: 'none' }}>
      <ProductCard>
        <ImageWrapper>
          <ProductImage src={thumbnail} alt={title} />
          <DiscountBadge>{discountPercent}% OFF</DiscountBadge>
          {isAiPick && <AIPickBadge>AI Pick</AIPickBadge>}
        </ImageWrapper>

        <ProductTitle>{title}</ProductTitle>
        {why && <p style={{ fontSize: 12, color: '#64748b' }}>{why}</p>}
        <PriceRow>
          <DiscountPrice>₹{discountPrice}</DiscountPrice>
          <OriginalPrice>₹{originalPrice}</OriginalPrice>
        </PriceRow>
      </ProductCard>
    </Link>
  )
}

export default ProductItem
