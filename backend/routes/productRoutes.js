const express = require('express');
const {
  getPublicProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../utils/cloudinary');

const router = express.Router();

// Rutas públicas
router.get('/', getPublicProducts);
router.get('/:id', getProductById);

// Rutas protegidas (admin)
router.get('/all', protect, getAllProducts);
router.post('/', protect, upload.single('image'), createProduct);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;