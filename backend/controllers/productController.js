const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc    Obtener productos activos (público)
// @route   GET /api/products
// @access  Public
const getPublicProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { active: true };

    if (category) {
      const cat = await Category.findOne({ slug: category, active: true });
      if (cat) query.category = cat._id;
    }

    const products = await Product.find(query)
      .populate('category', 'name slug emoji gradient')
      .sort('-createdAt');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// @desc    Obtener todos los productos (admin)
// @route   GET /api/products/all
// @access  Private
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name slug')
      .sort('-createdAt');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug emoji gradient');

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto' });
  }
};

// @desc    Crear nuevo producto
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { name, category, price, oldPrice, badge, emoji, gradient, active } = req.body;

    const productData = {
      name,
      category,
      price,
      oldPrice: oldPrice || null,
      badge: badge || null,
      emoji: emoji || '🛍️',
      gradient: gradient || null,
      active: active !== undefined ? active : true
    };

    // Si se subió una imagen
    if (req.file) {
      productData.image = req.file.path;
    }

    const product = await Product.create(productData);

    const populated = await Product.findById(product._id).populate('category', 'name slug');
    res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

// @desc    Actualizar producto
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const { name, category, price, oldPrice, badge, emoji, gradient, active } = req.body;

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.oldPrice = oldPrice !== undefined ? oldPrice : product.oldPrice;
    product.badge = badge !== undefined ? badge : product.badge;
    product.emoji = emoji || product.emoji;
    product.gradient = gradient !== undefined ? gradient : product.gradient;
    product.active = active !== undefined ? active : product.active;

    // Si se subió una nueva imagen
    if (req.file) {
      product.image = req.file.path;
    }

    const updated = await product.save();
    const populated = await Product.findById(updated._id).populate('category', 'name slug');

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

// @desc    Eliminar producto
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.deleteOne();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

module.exports = {
  getPublicProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};