import { useEffect, useContext } from 'react'

import WishlistContext from '../../context/WishlistContext'

import WishlistItem from '../../components/WishlistItem'
import Navbar from '../../components/Navbar'

import {
  WishlistContainer,
  WishlistHeading,
  WishlistList,
  EmptyView,
} from './styledComponents'

const WishlistPage = () => {
  const { wishList, fetchWishlist } = useContext(WishlistContext)

  useEffect(() => {
    fetchWishlist()
  }, [])

  if (wishList.length === 0) {
    return <EmptyView>Your wishlist is empty</EmptyView>
  }

  return (
    <>
      <Navbar />

      <WishlistContainer>
        <WishlistHeading>My Wishlist</WishlistHeading>

        <WishlistList>
          {wishList.map((item) => (
            <WishlistItem key={item.productId._id} item={item} />
          ))}
        </WishlistList>
      </WishlistContainer>
    </>
  )
}

export default WishlistPage
