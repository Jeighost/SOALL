const express = require('express');
const {
  getPublicCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas públicas
router.get('/', getPublicCategories);

// Rutas protegidas (admin)
router.get('/all', protect, getAllCategories);
router.post('/', protect, createCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;