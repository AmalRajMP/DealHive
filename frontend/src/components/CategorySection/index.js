import ProductItem from '../ProductItem'

import {
  SectionContainer,
  SectionTitle,
  SectionSubtitle,
  ProductsList,
} from './styledComponents'

const ProductSection = ({ title, subtitle, products }) => (
  <SectionContainer>
    <SectionTitle>{title}</SectionTitle>
    {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}

    <ProductsList>
      {products.map((eachItem) => (
        <ProductItem key={eachItem.id} productDetails={eachItem} />
      ))}
    </ProductsList>
  </SectionContainer>
)

export default ProductSection
