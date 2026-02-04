const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/add', async (req, res) => {
  const { userId, productId } = req.body

  const user = await User.findById(userId)

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

module.exports = router
