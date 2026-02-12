import { createContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishList, setWishList] = useState([])

  const fetchWishlist = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        setWishList([])
        return
      }

      const res = await fetch(
        `http://localhost:5000/api/wishlist/user/${userId}`,
      )
      const data = await res.json()
      setWishList(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Fetch wishlist failed:', error)
      setWishList([])
    }
  }

  const addToWishList = async (product) => {
    try {
      const res = await fetch('http://localhost:5000/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId: product._id,
        }),
      })

      const data = await res.json()
      setWishList(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Add to wishlist failed:', error)
    }
  }

  const removeFromWishList = async (productId) => {
    try {
      const res = await fetch('http://localhost:5000/api/wishlist/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId,
        }),
      })

      const data = await res.json()
      setWishList(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Remove from wishlist failed:', error)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (
    <WishlistContext.Provider
      value={{
        wishList,
        fetchWishlist,
        addToWishList,
        removeFromWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistContext
