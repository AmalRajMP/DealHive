import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'

import Header from '../../components/Navbar'
import CategorySection from '../../components/CategorySection'

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
  RecommendationLoaderBox,
  LoaderTitle,
  LoaderSub,
} from './styledComponents'

const ProductItemDetails = () => {
  const { id } = useParams()

  const { addToCart } = useContext(CartContext)
  const { wishList, addToWishList, removeFromWishList } =
    useContext(WishlistContext)

  const isWishListed = wishList?.some(
    (item) => String(item.productId?._id) === String(id),
  )

  const [productDetails, setProductDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const [similarProducts, setSimilarProducts] = useState([])
  const [similarStatus, setSimilarStatus] = useState(apiStatusConstants.initial)

  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [recommendedStatus, setRecommendedStatus] = useState(
    apiStatusConstants.initial,
  )

  const renderRecommendationLoader = () => (
    <RecommendationLoaderBox>
      <ThreeDots height="40" width="40" color="#2563eb" />
      <LoaderTitle>Finding deals you'll love...</LoaderTitle>
      <LoaderSub>AI is analyzing your interests</LoaderSub>
    </RecommendationLoaderBox>
  )
  const renderSimilarProductsLoader = () => (
    <RecommendationLoaderBox>
      <ThreeDots height="40" width="40" color="#2563eb" />
      <LoaderTitle>Finding similar items...</LoaderTitle>
      <LoaderSub>Analyzing this product</LoaderSub>
    </RecommendationLoaderBox>
  )

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
    if (isWishListed) removeFromWishList(productDetails._id)
    else addToWishList(formattedWishlistProduct)
  }

  const getProductDetails = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)

      const response = await fetch(`http://localhost:5000/api/products/${id}`)
      const data = await response.json()

      if (response.ok) {
        setProductDetails(data.productDetails)
        setApiStatus(apiStatusConstants.success)
      } else setApiStatus(apiStatusConstants.failure)
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const getSimilarProducts = async () => {
    try {
      setSimilarStatus(apiStatusConstants.inProgress)

      const response = await fetch(
        `http://localhost:5001/recommend/similar/${id}`,
      )
      const data = await response.json()

      if (response.ok) {
        setSimilarProducts(data.products || [])
        setSimilarStatus(apiStatusConstants.success)
      } else setSimilarStatus(apiStatusConstants.failure)
    } catch {
      setSimilarStatus(apiStatusConstants.failure)
    }
  }

  const getRecommendedProducts = async () => {
    try {
      setRecommendedStatus(apiStatusConstants.inProgress)

      const userId = localStorage.getItem('userId')
      if (!userId) {
        setRecommendedStatus(apiStatusConstants.success)
        return
      }

      const response = await fetch(`http://localhost:5001/recommend/${userId}`)
      const data = await response.json()

      if (response.ok) {
        const list =
          data.recommendations?.hybrid ||
          data.recommendations?.contentBased ||
          data.recommendations?.collaborative ||
          data.recommendations?.trending ||
          []

        const formatted = list.map((p) => ({
          ...p,
          thumbnail: p.thumbnail || p.image,
          discountPrice: p.discountPrice || p.price,
          originalPrice: p.originalPrice || p.price,
        }))

        setRecommendedProducts(formatted)
        setRecommendedStatus(apiStatusConstants.success)
      } else setRecommendedStatus(apiStatusConstants.failure)
    } catch {
      setRecommendedStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProductDetails()
    getSimilarProducts()
    getRecommendedProducts()
  }, [id])

  const renderLoader = () => (
    <LoaderContainer>
      <ThreeDots height="50" width="50" color="#2563eb" />
    </LoaderContainer>
  )

  const renderFailure = () => (
    <FailureContainer>
      <MdErrorOutline size={50} />
      <FailureText>Failed to load product.</FailureText>
      <RetryButton onClick={getProductDetails}>Retry</RetryButton>
    </FailureContainer>
  )

  const renderProduct = () => (
    <>
      <Page>
        <Card>
          <ImageSection>
            <ProductImage
              src={productDetails.thumbnail}
              alt={productDetails.title}
            />

            <WishlistButton type="button" onClick={onToggleWishlist}>
              {isWishListed ? (
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
                onClick={() => addToCart(formattedCartProduct)}
              >
                Add to Cart
              </AddToCartButton>

              <BuyNowButton type="button">Buy Now</BuyNowButton>
            </ButtonGroup>
          </DetailsSection>
        </Card>
      </Page>

      {similarStatus === apiStatusConstants.inProgress &&
        renderSimilarProductsLoader()}

      {similarStatus === apiStatusConstants.success &&
        similarProducts.length > 0 && (
          <CategorySection
            title="Similar Products"
            subtitle="Based on this item"
            products={similarProducts}
          />
        )}

      {recommendedStatus === apiStatusConstants.inProgress &&
        renderRecommendationLoader()}

      {recommendedStatus === apiStatusConstants.success &&
        recommendedProducts.length > 0 && (
          <CategorySection
            title="Recommended For You"
            subtitle="Personalized picks"
            products={recommendedProducts}
          />
        )}
    </>
  )

  const renderSwitch = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return renderProduct()
      case apiStatusConstants.failure:
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderSwitch()}
    </>
  )
}

export default ProductItemDetails
