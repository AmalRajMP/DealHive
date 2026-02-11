import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'

import Header from '../../components/Navbar'

import CartContext from '../../context/CartContext'
import WishlistContext from '../../context/WishlistContext'

import { ThreeDots } from 'react-loader-spinner'
import { MdErrorOutline } from 'react-icons/md'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

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
  WishlistButton,
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
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addToCart } = useContext(CartContext)
  const { addToWishList, removeFromWishList } = useContext(WishlistContext)

  const formattedCartProduct = {
    _id: productDetails._id,
    title: productDetails.title,
    image: productDetails.thumbnail,
    price: productDetails.discountPrice,
  }

  const formattedWishlistProduct = {
    _id: productDetails._id,
    title: productDetails.title,
    image: productDetails.thumbnail,
    price: productDetails.discountPrice,
  }

  const onToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishList(productDetails._id)
    } else {
      addToWishList(formattedWishlistProduct)
    }
    setIsWishlisted((prev) => !prev)
  }

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

          <WishlistButton type="button" onClick={onToggleWishlist}>
            {isWishlisted ? (
              <AiFillHeart size={22} color="#e11d48" />
            ) : (
              <AiOutlineHeart size={22} color="#1e40af" />
            )}
          </WishlistButton>
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
            <AddToCartButton
              type="button"
              onClick={() => {
                console.log('ADDING TO CART:', formattedCartProduct)

                addToCart(formattedCartProduct)
              }}
            >
              Add to Cart
            </AddToCartButton>

            <BuyNowButton type="button">Buy Now</BuyNowButton>
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
