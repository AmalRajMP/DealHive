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
  const { title, thumbnail, originalPrice, discountPrice, discountPercent } =
    productDetails

  return (
    <ProductCard>
      <ImageWrapper>
        <ProductImage src={thumbnail} alt={title} />
        <DiscountBadge>{discountPercent}% OFF</DiscountBadge>
        <AIPickBadge>AI Pick</AIPickBadge>
      </ImageWrapper>

      <ProductTitle>{title}</ProductTitle>

      <PriceRow>
        <DiscountPrice>₹{discountPrice}</DiscountPrice>
        <OriginalPrice>₹{originalPrice}</OriginalPrice>
      </PriceRow>
    </ProductCard>
  )
}

export default ProductItem
