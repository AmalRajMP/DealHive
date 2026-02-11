const User = require('../models/User')

const getWishList = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).populate('wishList.productId')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user.wishList)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch wishlist' })
  }
}

const addToWishList = async (req, res) => {
  try {
    const { userId, productId } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const item = user.wishList.find(
      (item) =>
        item.productId._id?.toString() === productId ||
        item.productId.toString() === productId,
    )

    if (!item) {
      user.wishList.push({ productId })
    }

    await user.save()
    await user.populate('wishList.productId')
    res.status(200).json(user.wishList)
  } catch (e) {
    res.status(500).json({ message: 'Failed adding to wishList' })
  }
}

const removeFromWishList = async (req, res) => {
  try {
    const { userId, productId } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.wishList = user.wishList.filter(
      (item) =>
        item.productId._id?.toString() !== productId &&
        item.productId.toString() !== productId,
    )

    await user.save()
    await user.populate('wishList.productId')
    res.status(200).json(user.wishList)
  } catch (e) {
    res.status(500).json({ message: 'Failed removing from wishList' })
  }
}

module.exports = { getWishList, addToWishList, removeFromWishList }
