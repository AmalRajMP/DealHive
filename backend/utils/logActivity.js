const UserActivity = require('../models/UserActivity')
const Product = require('../models/Product') // import product model

const logActivity = async (userId, action, meta = {}) => {
  try {
    // ------------------------------------------------
    // AUTO-ENRICH PRODUCT DATA
    // ------------------------------------------------
    if (meta.productId && !meta.category) {
      try {
        const product = await Product.findById(meta.productId).lean()

        if (product) {
          meta.title = product.title
          meta.category = product.category
          meta.thumbnail = product.thumbnail
        }
      } catch (err) {
        console.log('Product lookup failed:', err.message)
      }
    }

    // ------------------------------------------------
    // SAVE ACTIVITY
    // ------------------------------------------------
    await UserActivity.create({
      user: userId,
      action,
      meta,
    })
  } catch (err) {
    console.log('Activity log failed:', err.message)
  }
}

module.exports = logActivity
