const User = require('../models/User')

const getCart = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).populate('cartList.productId')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user.cartList)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch cart' })
  }
}

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const item = user.cartList.find(
      (item) => item.productId.toString() === productId,
    )

    if (item) {
      item.quantity += 1
    } else {
      user.cartList.push({ productId, quantity: 1 })
    }

    await user.save()
    await user.populate('cartList.productId')
    res.json(user.cartList)
  } catch (e) {
    res.status(500).json({ message: 'Failed adding to cart' })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.cartList = user.cartList.filter(
      (item) => item.productId.toString() !== productId,
    )

    await user.save()
    await user.populate('cartList.productId')
    res.json(user.cartList)
  } catch (e) {
    res.status(500).json({ message: 'Failed removing from cart' })
  }
}

const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, change } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const item = user.cartList.find(
      (item) => item.productId.toString() === productId,
    )
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' })
    }

    item.quantity += change

    if (item.quantity <= 0) {
      user.cartList = user.cartList.filter(
        (item) => item.productId.toString() !== productId,
      )
    }

    await user.save()
    await user.populate('cartList.productId')
    res.json(user.cartList)
  } catch (e) {
    res.status(500).json({ message: 'Failed to update quantity' })
  }
}

module.exports = { getCart, addToCart, removeFromCart, updateQuantity }
