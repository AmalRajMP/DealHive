import {
  ProductCard,
  ImageWrapper,
  ProductImage,
  ProductTitle,
  ExplanationText,
  PriceRow,
  DiscountPrice,
  OriginalPrice,
} from "./styledComponents"

const ProductSkeleton = () => (
  <ProductCard>
    <ImageWrapper>
      <ProductImage />
    </ImageWrapper>

    <ProductTitle />
    <ExplanationText />
    <PriceRow>
      <DiscountPrice />
      <OriginalPrice />
    </PriceRow>
  </ProductCard>
)

export default ProductSkeleton
