import ProductItem from "../ProductItem"

import {
  SectionContainer,
  SectionTitle,
  SectionSubtitle,
  ProductsList,
  ProductSkeleton,
} from "./styledComponents"

const CategorySection = ({
  isLoading,
  title,
  subtitle,
  products,
  layout = "row",
}) => {
  console.log("CategorySection loading:", isLoading)
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <ProductsList layout={layout}>
        {products.map((eachItem) =>
          isLoading ? (
            <ProductSkeleton />
          ) : (
            <ProductItem key={eachItem._id} productDetails={eachItem} />
          ),
        )}
      </ProductsList>
    </SectionContainer>
  )
}
export default CategorySection
