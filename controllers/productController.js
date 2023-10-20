const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
    const products = await Product.find();
    res.json(products);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

  // Get product by ID
exports.getProductById = async (req, res) => {
    try {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

 // Add New product 
exports.addProduct = async (req, res) => {
    try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};

// update product by ID
exports.updateProductById = async (req, res) => {
    try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};

// remove product by ID
exports.removeProductById = async (req, res) => {
    try {
    const removedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!removedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product removed' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// remove all products
exports.removeAllProducts = async (req, res) => {
    try {
    await Product.deleteMany({});
    res.json({ message: 'All products removed' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// find products by name
exports.findProductsByName = async (req, res) => {
    try {
    const keyword = req.query.name;
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
    res.json(products);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};




