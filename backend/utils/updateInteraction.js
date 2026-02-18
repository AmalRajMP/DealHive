const User = require('../models/User')

const weightMap = {
  view: 1,
  wishlist: 2,
  cart: 3,
  purchase: 5,
}

const updateInteraction = async (userId, productId, action) => {
  if (!userId || !productId || !action) return

  const weight = weightMap[action]
  if (!weight) return

  const user = await User.findById(userId)
  if (!user) return

  const existing = user.preferences.interactions.find(
    (item) => item.productId.toString() === productId.toString(),
  )

  if (existing) {
    if (weight > existing.weight) {
      existing.weight = weight
    }
  } else {
    user.preferences.interactions.push({ productId, weight })
  }

  await user.save()
}

module.exports = updateInteraction
