const express = require('express');
const {
  getPublicSettings,
  getAllSettings,
  updateSettings
} = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas públicas
router.get('/', getPublicSettings);

// Rutas protegidas (admin)
router.get('/all', protect, getAllSettings);
router.put('/', protect, updateSettings);

module.exports = router;