const UserActivity = require('../models/UserActivity')

const logActivity = async (userId, action, meta = {}) => {
  try {
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
