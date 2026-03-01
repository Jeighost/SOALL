const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  emoji: {
    type: String,
    default: '📁'
  },
  gradient: {
    type: String,
    default: 'linear-gradient(145deg,#f5f0ff,#e8deff)'
  },
  image: {
    type: String, // URL de imagen opcional
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);