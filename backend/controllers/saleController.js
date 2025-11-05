import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

// @desc    Obtener todas las ventas
// @route   GET /api/sales
// @access  Private
export const getSales = async (req, res, next) => {
  try {
    const { branch, startDate, endDate, status } = req.query;
    
    let query = {};

    // Filtros
    if (branch) query.branch = branch;
    if (status) query.status = status;
    
    // Rango de fechas
    if (startDate || endDate) {
      query.saleDate = {};
      if (startDate) query.saleDate.$gte = new Date(startDate);
      if (endDate) query.saleDate.$lte = new Date(endDate);
    }

    const sales = await Sale.find(query)
      .populate('items.product', 'name category')
      .sort({ saleDate: -1 });

    res.status(200).json({
      success: true,
      count: sales.length,
      sales
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nueva venta
// @route   POST /api/sales
// @access  Private
export const createSale = async (req, res, next) => {
  try {
    const { branch, items, paymentMethod, customer, notes } = req.body;

    // Validar stock y calcular totales
    let totalAmount = 0;
    let totalCost = 0;
    let totalProfit = 0;
    const saleItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Producto ${item.product} no encontrado`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para ${product.name}. Stock disponible: ${product.stock}`
        });
      }

      const subtotal = product.price * item.quantity;
      const itemCost = product.cost * item.quantity;
      const profit = subtotal - itemCost;

      saleItems.push({
        product: product._id,
        sku: product.sku,
        name: product.name,
        category: product.category,
        gender: product.gender,
        size: product.size,
        quantity: item.quantity,
        unitPrice: product.price,
        unitCost: product.cost,
        subtotal,
        profit
      });

      totalAmount += subtotal;
      totalCost += itemCost;
      totalProfit += profit;

      // Actualizar stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Generar número de venta único
    const lastSale = await Sale.findOne().sort({ createdAt: -1 });
    let saleNumber = 'VT-0001';
    if (lastSale) {
      const lastNumber = parseInt(lastSale.saleNumber.split('-')[1]);
      saleNumber = `VT-${String(lastNumber + 1).padStart(4, '0')}`;
    }

    const sale = await Sale.create({
      saleNumber,
      branch,
      items: saleItems,
      totalAmount,
      totalCost,
      totalProfit,
      paymentMethod,
      customer,
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Venta registrada exitosamente',
      sale
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener venta por ID
// @route   GET /api/sales/:id
// @access  Private
export const getSaleById = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('items.product', 'name category brand');

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Venta no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      sale
    });
  } catch (error) {
    next(error);
  }
};

