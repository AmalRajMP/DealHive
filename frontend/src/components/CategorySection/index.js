import ProductItem from "../ProductItem"
import ProductSkeleton from "../ProductSkeleton"

import {
  SectionContainer,
  SectionTitle,
  SectionSubtitle,
  ProductsList,
} from "./styledComponents"

const CategorySection = ({
  isLoading,
  title,
  subtitle,
  products,
  layout = "row",
}) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <ProductsList layout={layout}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((eachItem) => (
              <ProductItem key={eachItem._id} productDetails={eachItem} />
            ))}
      </ProductsList>
    </SectionContainer>
  )
}
export default CategorySection
