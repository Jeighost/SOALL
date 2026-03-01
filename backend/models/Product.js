const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number,
    default: null
  },
  badge: {
    type: String,
    default: null
  },
  emoji: {
    type: String,
    default: '🛍️'
  },
  image: {
    type: String, // URL de Cloudinary
    default: null
  },
  gradient: {
    type: String,
    default: null // Si es null, se usará el de la categoría
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);