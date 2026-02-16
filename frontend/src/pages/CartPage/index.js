import { useEffect, useContext, useState } from 'react'
import CartContext from '../../context/CartContext'

import CartItem from '../../components/CartItem'
import Navbar from '../../components/Navbar'

import { ThreeDots } from 'react-loader-spinner'
import { MdErrorOutline } from 'react-icons/md'

import apiStatusConstants from '../../constants/apiStatusConstants'

import empty_cart from '../../assets/empty_cart.svg'

import {
  CartContainer,
  CartHeading,
  CartList,
  EmptyView,
  EmptyImage,
  OrderSummary,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  PlaceOrderButton,
  LoaderContainer,
  FailureContainer,
  FailureImage,
  FailureText,
  RetryButton,
} from './styledComponents'

const CartPage = () => {
  const { cartList, fetchCart } = useContext(CartContext)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const totalPrice = cartList.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.quantity * currentItem.productId.discountPrice,
    0,
  )

  const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('authToken')

      const res = await fetch('http://localhost:5000/api/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: 'Default Address',
        }),
      })

      if (!res.ok) throw new Error('Order failed')

      await fetchCart()
      alert('Order placed successfully')
    } catch (err) {
      alert('Failed to place order')
    }
  }

  const getCart = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)
      await fetchCart()
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

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
      <FailureText>Failed to load cart items</FailureText>
      <RetryButton onClick={getCart}>Retry</RetryButton>
    </FailureContainer>
  )

  const renderSuccessView = () => {
    if (cartList.length === 0) {
      return (
        <EmptyView>
          <EmptyImage src={empty_cart} alt="empty cart" />
          <p>Your cart is empty</p>
        </EmptyView>
      )
    }

    return (
      <CartContainer>
        <CartHeading>My Cart</CartHeading>

        <CartList>
          {cartList.map((item) => (
            <CartItem key={item.productId._id} item={item} />
          ))}
        </CartList>

        <OrderSummary>
          <SummaryRow>
            <SummaryLabel>Total Items</SummaryLabel>
            <SummaryValue>{totalItems}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Grand Total</SummaryLabel>
            <SummaryValue>₹{totalPrice}</SummaryValue>
          </SummaryRow>

          <PlaceOrderButton onClick={handlePlaceOrder}>
            Place Order
          </PlaceOrderButton>
        </OrderSummary>
      </CartContainer>
    )
  }

  const renderCartPage = () => {
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
      {renderCartPage()}
    </>
  )
}

export default CartPage
