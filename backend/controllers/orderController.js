const Order = require('../models/Order')
const User = require('../models/User')
const logActivity = require('../utils/logActivity')

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
      address: {
        fullName: req.body.fullName,
        phone: req.body.phone,
        addressLine: req.body.addressLine,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
      },
      status: 'pending',
    })

    await logActivity(userId, 'Placed Order', {
      orderId: order._id,
      totalAmount: total,
      itemCount: items.length,
    })

    user.cartList = []
    await user.save()

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('user', 'firstName lastName emailID')
      .populate('items.product', 'title thumbnail discountPrice')
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'firstName lastName emailID')
      .populate('items.product', 'title thumbnail discountPrice')
      .sort({ createdAt: -1 })
    console.log(JSON.stringify(orders[0], null, 2))
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    order.status = req.body.status
    await order.save()

    await logActivity(order.user, 'Order Status Updated', {
      orderId: order._id,
      newStatus: order.status,
    })

    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { checkoutCart, getMyOrders, getAllOrders, updateOrderStatus }
