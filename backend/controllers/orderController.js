const Order = require('../models/Order')
const User = require('../models/User')

const checkoutCart = async (req, res) => {
  try {
    const userId = req.user.id

    const user = await User.findById(userId).populate('cartList.productId')

    if (!user || user.cartList.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    let total = 0

    const items = user.cartList.map((item) => {
      const product = item.productId
      total += product.discountPrice * item.quantity

      return {
        product: product._id,
        quantity: item.quantity,
        price: product.discountPrice,
      }
    })

    const order = await Order.create({
      user: userId,
      items,
      totalAmount: total,
      address: req.body.address,
      status: 'placed',
    })

    user.cartList = []
    await user.save()

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { checkoutCart }
