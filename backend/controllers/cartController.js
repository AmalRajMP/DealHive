const User = require('../models/User')
const logActivity = require('../utils/logActivity')

const getCart = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).populate('cartList.productId')

    console.log('REQ USER:', req.user)

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
    const userId = req.user.id
    const { productId } = req.body
    console.log('REQ USER:', req.user)

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

    await logActivity(userId, 'Added To Cart', { productId })

    await user.populate('cartList.productId')
    res.json(user.cartList)
  } catch (e) {
    res.status(500).json({ message: 'Failed adding to cart' })
  }
}

const addMultipleToCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { wishList } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    for (const wishListItem of wishList) {
      const item = user.cartList.find(
        (item) => item.productId.toString() === wishListItem.productId,
      )

      if (item) {
        item.quantity += 1
      } else {
        user.cartList.push({ productId: wishListItem.productId, quantity: 1 })
      }
    }

    await user.save()

    await logActivity(userId, 'Added Multiple To Cart', {
      count: wishList.length,
    })

    await user.populate('cartList.productId')
    res.json(user.cartList)
  } catch (e) {
    res.status(500).json({ message: 'Failed adding multiple products to cart' })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.cartList = user.cartList.filter(
      (item) => item.productId.toString() !== productId,
    )

    await user.save()

    await logActivity(userId, 'Removed From Cart', { productId })

    await user.populate('cartList.productId')
    res.json(user.cartList)
  } catch (e) {
    res.status(500).json({ message: 'Failed removing from cart' })
  }
}

const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, change } = req.body

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

    await logActivity(userId, 'Updated Cart Quantity', {
      productId,
      change,
    })

    await user.populate('cartList.productId')
    res.json(user.cartList)
  } catch (e) {
    res.status(500).json({ message: 'Failed to update quantity' })
  }
}

module.exports = {
  getCart,
  addToCart,
  addMultipleToCart,
  removeFromCart,
  updateQuantity,
}
