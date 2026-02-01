import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Header from '../../components/Navbar'

import { ThreeDots } from 'react-loader-spinner'
import { MdErrorOutline } from 'react-icons/md'

import apiStatusConstants from '../../constants/apiStatusConstants'

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
  LoaderContainer,
  FailureContainer,
  FailureText,
  RetryButton,
} from './styledComponents'

const ProductItemDetails = () => {
  const { id } = useParams()

  const [productDetails, setProductDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getProductDetails = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)

      const url = `http://localhost:5000/api/products/${id}`
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        setProductDetails(data.productDetails)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [id])

  const renderLoadingView = () => (
    <LoaderContainer>
      <ThreeDots color="#1e40af" height="50" width="50" radius="9" />
    </LoaderContainer>
  )

  const renderFailureView = () => (
    <FailureContainer>
      <MdErrorOutline size={50} />
      <FailureText>Failed to load product details.</FailureText>
      <RetryButton onClick={getProductDetails}>Retry</RetryButton>
    </FailureContainer>
  )

  const renderSuccessView = () => (
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
  )

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderProductDetails()}
    </>
  )
}

export default ProductItemDetails
