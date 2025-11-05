import Product from '../models/Product.js';

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res, next) => {
  try {
    const { category, gender, size, active, search, sortBy } = req.query;
    
    let query = {};

    // Filtros
    if (category) query.category = category;
    if (gender) query.gender = gender;
    if (size) query.size = size;
    if (active !== undefined) query.active = active === 'true';
    
    // Búsqueda
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }

    // Ordenamiento
    let sort = {};
    if (sortBy === 'name') sort.name = 1;
    else if (sortBy === 'price-asc') sort.price = 1;
    else if (sortBy === 'price-desc') sort.price = -1;
    else if (sortBy === 'stock-low') sort.stock = 1;
    else if (sortBy === 'stock-high') sort.stock = -1;
    else sort.createdAt = -1;

    const products = await Product.find(query).sort(sort);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener producto por ID
// @route   GET /api/products/:id
// @access  Private
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nuevo producto
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar producto
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar producto (soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Soft delete
    product.active = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Producto desactivado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener productos con bajo stock
// @route   GET /api/products/alerts/low-stock
// @access  Private
export const getLowStockProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ['$stock', '$minStock'] },
      active: true
    }).sort({ stock: 1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

