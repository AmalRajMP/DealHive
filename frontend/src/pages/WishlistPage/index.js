import { useEffect, useContext, useState } from 'react'

import WishlistContext from '../../context/WishlistContext'
import CartContext from '../../context/CartContext'

import WishlistItem from '../../components/WishlistItem'
import Navbar from '../../components/Navbar'

import { ThreeDots } from 'react-loader-spinner'

import apiStatusConstants from '../../constants/apiStatusConstants'

import empty_wishlist from '../../assets/empty_wishlist.svg'

import {
  WishlistContainer,
  WishlistHeading,
  WishlistList,
  WishlistActionBar,
  ActionButton,
  EmptyView,
  EmptyImage,
  LoaderContainer,
  FailureContainer,
  FailureImage,
  FailureText,
  RetryButton,
} from './styledComponents'

const WishlistPage = () => {
  const { wishList, fetchWishlist } = useContext(WishlistContext)
  const { addMultipleToCart } = useContext(CartContext)

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getWishlist = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)
      await fetchWishlist()
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  const clearWishList = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      console.log('User not authenticated')
      return
    }

    try {
      const url = 'http://localhost:5000/api/wishlist/clear'
      const options = {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(url, options)
      if (response.ok) {
        await getWishlist()
        console.log('Wishlist cleared')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onAddAllToCart = async () => {
    try {
      await addMultipleToCart(wishList)
      await clearWishList()
    } catch (e) {
      console.log(e)
    }
  }

  const renderLoadingView = () => (
    <LoaderContainer>
      <ThreeDots color="#1e40af" height="50" width="50" radius="9" />
    </LoaderContainer>
  )

  const renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <FailureText>Failed to load wishlist items</FailureText>
      <RetryButton onClick={getWishlist}>Retry</RetryButton>
    </FailureContainer>
  )

  const renderSuccessView = () => {
    if (wishList.length === 0) {
      return (
        <EmptyView>
          <EmptyImage src={empty_wishlist} alt="empty wishlist" />
          <p>Your wishlist is empty</p>
        </EmptyView>
      )
    }

    return (
      <WishlistContainer>
        <WishlistHeading>My Wishlist</WishlistHeading>
        <WishlistList>
          {wishList.map((item) => (
            <WishlistItem key={item.productId._id} item={item} />
          ))}
          <WishlistActionBar>
            <ActionButton primary onClick={onAddAllToCart}>
              Move All to Cart
            </ActionButton>
            <ActionButton danger onClick={clearWishList}>
              Clear Wishlist
            </ActionButton>
          </WishlistActionBar>
        </WishlistList>
      </WishlistContainer>
    )
  }

  const renderWishlistPage = () => {
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
      <Navbar />
      {renderWishlistPage()}
    </>
  )
}

export default WishlistPage
