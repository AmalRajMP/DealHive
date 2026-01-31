import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Header from '../../components/Navbar'

import {
  Page,
  Card,
  ImageSection,
  ProductImage,
  DetailsSection,
  Title,
  Brand,
  Rating,
  PriceRow,
  DiscountPrice,
  OriginalPrice,
  Description,
  ButtonGroup,
  AddToCartButton,
  BuyNowButton,
} from './styledComponents'

const ProductItemDetails = () => {
  const { id } = useParams()
  const [productDetails, setProductDetails] = useState({})

  const getProductDetails = async () => {
    const url = `http://localhost:5000/api/products/${id}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      setProductDetails(data.productDetails)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [id])

  if (!productDetails._id) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Header />
      <Page>
        <Card>
          <ImageSection>
            <ProductImage
              src={productDetails.thumbnail}
              alt={productDetails.title}
            />
          </ImageSection>

          <DetailsSection>
            <Title>{productDetails.title}</Title>

            <Brand>
              Brand: <span>{productDetails.brand}</span>
            </Brand>

            <Rating>⭐ {productDetails.rating} / 5</Rating>

            <PriceRow>
              <DiscountPrice>₹{productDetails.discountPrice}</DiscountPrice>
              <OriginalPrice>₹{productDetails.originalPrice}</OriginalPrice>
            </PriceRow>

            <Description>{productDetails.description}</Description>
            <ButtonGroup>
              <AddToCartButton>Add to Cart</AddToCartButton>
              <BuyNowButton>Buy Now</BuyNowButton>
            </ButtonGroup>
          </DetailsSection>
        </Card>
      </Page>
    </>
  )
}

export default ProductItemDetails
