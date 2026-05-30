import { createContext, useState, useEffect } from "react"

import BASE_URL from "../../config/api"

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishList, setWishList] = useState([])

  const getAuthHeader = () => {
    const token = localStorage.getItem("authToken")
    return {
      authorization: `Bearer ${token}`,
    }
  }
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        setWishList([])
        return
      }
      const url = `${BASE_URL}/api/wishlist`
      const options = {
        headers: getAuthHeader(),
      }
      const res = await fetch(url, options)
      const data = await res.json()
      setWishList(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Fetch wishlist failed:", error)
      setWishList([])
    }
  }

  const addToWishList = async (product) => {
    try {
      const url = `${BASE_URL}/api/wishlist/add`
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({
          productId: product._id,
        }),
      }
      const res = await fetch(url, options)

      const data = await res.json()
      setWishList(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Add to wishlist failed:", error)
    }
  }

  const removeFromWishList = async (productId) => {
    try {
      const url = `${BASE_URL}/api/wishlist/remove`
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({
          productId,
        }),
      }

      const res = await fetch(url, options)

      const data = await res.json()
      setWishList(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Remove from wishlist failed:", error)
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
