import ProductItem from '../ProductItem'

import {
  SectionContainer,
  SectionTitle,
  SectionSubtitle,
  ProductsList,
} from './styledComponents'

const CategorySection = ({ title, subtitle, products, layout = 'row' }) => (
  <SectionContainer>
    <SectionTitle>{title}</SectionTitle>
    {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}

    <ProductsList layout={layout}>
      {products.map((eachItem) => (
        <ProductItem key={eachItem._id} productDetails={eachItem} />
      ))}
    </ProductsList>
  </SectionContainer>
)

export default CategorySection
