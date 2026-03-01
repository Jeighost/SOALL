const Category = require('../models/Category');

// @desc    Obtener todas las categorías activas (público)
// @route   GET /api/categories
// @access  Public
const getPublicCategories = async (req, res) => {
  try {
    const categories = await Category.find({ active: true }).sort('order');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

// @desc    Obtener todas las categorías (admin)
// @route   GET /api/categories/all
// @access  Private
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort('order');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

// @desc    Crear nueva categoría
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    const { name, slug, emoji, gradient, order, active } = req.body;

    const categoryExists = await Category.findOne({ $or: [{ name }, { slug }] });
    if (categoryExists) {
      return res.status(400).json({ message: 'La categoría ya existe' });
    }

    const category = await Category.create({
      name,
      slug,
      emoji,
      gradient: gradient || 'linear-gradient(145deg,#f5f0ff,#e8deff)',
      order: order || 0,
      active: active !== undefined ? active : true
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría' });
  }
};

// @desc    Actualizar categoría
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    const { name, slug, emoji, gradient, order, active } = req.body;

    // Verificar si ya existe otra categoría con el mismo nombre o slug
    if (name || slug) {
      const existing = await Category.findOne({
        $and: [
          { _id: { $ne: req.params.id } },
          { $or: [{ name }, { slug }] }
        ]
      });
      if (existing) {
        return res.status(400).json({ message: 'El nombre o slug ya está en uso' });
      }
    }

    category.name = name || category.name;
    category.slug = slug || category.slug;
    category.emoji = emoji || category.emoji;
    category.gradient = gradient || category.gradient;
    category.order = order !== undefined ? order : category.order;
    category.active = active !== undefined ? active : category.active;

    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoría' });
  }
};

// @desc    Eliminar categoría
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    // Verificar si hay productos usando esta categoría
    const Product = require('../models/Product');
    const productsCount = await Product.countDocuments({ category: req.params.id });

    if (productsCount > 0) {
      return res.status(400).json({ 
        message: `No se puede eliminar: ${productsCount} producto(s) usan esta categoría` 
      });
    }

    await category.deleteOne();
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
};

module.exports = {
  getPublicCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};