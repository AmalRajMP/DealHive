const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      reviewerName: String,
      rating: Number,
      comment: String,
    },
  ],
  isServiceable: {
    type: Boolean,
    default: false,
  },
  serviceCenters: [{ type: String }],
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
