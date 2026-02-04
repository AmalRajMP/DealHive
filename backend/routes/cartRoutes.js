const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/add', async (req, res) => {
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
  res.json(user.cartList)
})

router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body

  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.cartList = user.cartList.filter(
    (item) => item.productId.toString() !== productId,
  )

  await user.save()
  res.json(user.cartList)
})
module.exports = router
