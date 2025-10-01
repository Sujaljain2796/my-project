const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter by Category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Variant Details
exports.getVariantDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select("name variants.color variants.size");
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
