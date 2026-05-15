const User = require('../models/User')

const getCurrentUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id).select('-password')

    if (!userDetails) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    res.send(userDetails)
  } catch (e) {
    res.status(500).json({
      message: 'Failed to fetch user details',
    })
  }
}

const updateUserDetails = async (req, res) => {
  try {
    const userDetails = req.body

    if (!userDetails) {
      return res.status(400).json({
        message: 'User Details not Provided',
      })
    }
    const { fullName, email, phone, addressLine, city, state, pincode } =
      userDetails

    const fullNameArray = fullName.split(' ')

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        firstName: fullNameArray[0],
        lastName: fullNameArray.slice(1).join(' '),
        emailID: email,
        contactNo: phone,
        address: {
          addressLine,
          city,
          state,
          pincode,
        },
      },
      { new: true },
    ).select('-password')

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User Not Found',
      })
    }
    res.status(200).json({
      message: 'User Details Updated Successfully',
      updatedUserDetails: updatedUser,
    })
  } catch (e) {
    console.log(e)

    res.status(500).json({
      message: 'Failed to update user details',
    })
  }
}
module.exports = { getCurrentUserDetails, updateUserDetails }
