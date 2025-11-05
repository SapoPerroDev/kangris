import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

// @desc    Dashboard con KPIs principales
// @route   GET /api/analytics/dashboard
// @access  Private
export const getDashboard = async (req, res, next) => {
  try {
    const { startDate, endDate, branch } = req.query;
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.saleDate = {};
      if (startDate) dateFilter.saleDate.$gte = new Date(startDate);
      if (endDate) dateFilter.saleDate.$lte = new Date(endDate);
    }

    let branchFilter = {};
    if (branch && branch !== 'Todas') {
      branchFilter.branch = branch;
    }

    const matchFilter = { ...dateFilter, ...branchFilter, status: 'Completada' };

    // KPIs principales
    const [salesData, productsData] = await Promise.all([
      Sale.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: null,
            totalSales: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            totalProfit: { $sum: '$totalProfit' },
            totalCost: { $sum: '$totalCost' },
            avgTicket: { $avg: '$totalAmount' }
          }
        }
      ]),
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            totalStockValue: { $sum: { $multiply: ['$stock', '$price'] } },
            lowStockCount: {
              $sum: {
                $cond: [{ $lte: ['$stock', '$minStock'] }, 1, 0]
              }
            }
          }
        }
      ])
    ]);

    const kpis = {
      totalSales: salesData[0]?.totalSales || 0,
      totalRevenue: salesData[0]?.totalRevenue || 0,
      totalProfit: salesData[0]?.totalProfit || 0,
      avgTicket: salesData[0]?.avgTicket || 0,
      profitMargin: salesData[0]?.totalRevenue 
        ? ((salesData[0]?.totalProfit / salesData[0]?.totalRevenue) * 100).toFixed(2)
        : 0,
      totalProducts: productsData[0]?.totalProducts || 0,
      totalStockValue: productsData[0]?.totalStockValue || 0,
      lowStockAlerts: productsData[0]?.lowStockCount || 0
    };

    res.status(200).json({
      success: true,
      kpis
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Productos más vendidos
// @route   GET /api/analytics/top-products
// @access  Private
export const getTopProducts = async (req, res, next) => {
  try {
    const { limit = 10, startDate, endDate, branch } = req.query;
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.saleDate = {};
      if (startDate) dateFilter.saleDate.$gte = new Date(startDate);
      if (endDate) dateFilter.saleDate.$lte = new Date(endDate);
    }

    let branchFilter = {};
    if (branch && branch !== 'Todas') {
      branchFilter.branch = branch;
    }

    const matchFilter = { ...dateFilter, ...branchFilter, status: 'Completada' };

    const topProducts = await Sale.aggregate([
      { $match: matchFilter },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.sku',
          name: { $first: '$items.name' },
          category: { $first: '$items.category' },
          gender: { $first: '$items.gender' },
          size: { $first: '$items.size' },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.subtotal' },
          totalProfit: { $sum: '$items.profit' },
          timesOrdered: { $sum: 1 }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.status(200).json({
      success: true,
      count: topProducts.length,
      products: topProducts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Ventas por categoría
// @route   GET /api/analytics/by-category
// @access  Private
export const getSalesByCategory = async (req, res, next) => {
  try {
    const { startDate, endDate, branch } = req.query;
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.saleDate = {};
      if (startDate) dateFilter.saleDate.$gte = new Date(startDate);
      if (endDate) dateFilter.saleDate.$lte = new Date(endDate);
    }

    let branchFilter = {};
    if (branch && branch !== 'Todas') {
      branchFilter.branch = branch;
    }

    const matchFilter = { ...dateFilter, ...branchFilter, status: 'Completada' };

    const categoryData = await Sale.aggregate([
      { $match: matchFilter },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.category',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.subtotal' },
          totalProfit: { $sum: '$items.profit' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.status(200).json({
      success: true,
      count: categoryData.length,
      data: categoryData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Ventas por género
// @route   GET /api/analytics/by-gender
// @access  Private
export const getSalesByGender = async (req, res, next) => {
  try {
    const { startDate, endDate, branch } = req.query;
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.saleDate = {};
      if (startDate) dateFilter.saleDate.$gte = new Date(startDate);
      if (endDate) dateFilter.saleDate.$lte = new Date(endDate);
    }

    let branchFilter = {};
    if (branch && branch !== 'Todas') {
      branchFilter.branch = branch;
    }

    const matchFilter = { ...dateFilter, ...branchFilter, status: 'Completada' };

    const genderData = await Sale.aggregate([
      { $match: matchFilter },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.gender',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.subtotal' },
          totalProfit: { $sum: '$items.profit' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.status(200).json({
      success: true,
      count: genderData.length,
      data: genderData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Tallas más vendidas
// @route   GET /api/analytics/by-size
// @access  Private
export const getSalesBySize = async (req, res, next) => {
  try {
    const { startDate, endDate, branch, gender } = req.query;
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.saleDate = {};
      if (startDate) dateFilter.saleDate.$gte = new Date(startDate);
      if (endDate) dateFilter.saleDate.$lte = new Date(endDate);
    }

    let branchFilter = {};
    if (branch && branch !== 'Todas') {
      branchFilter.branch = branch;
    }

    const matchFilter = { ...dateFilter, ...branchFilter, status: 'Completada' };

    const pipeline = [
      { $match: matchFilter },
      { $unwind: '$items' }
    ];

    if (gender) {
      pipeline.push({ $match: { 'items.gender': gender } });
    }

    pipeline.push(
      {
        $group: {
          _id: { size: '$items.size', gender: '$items.gender' },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.subtotal' }
        }
      },
      { $sort: { totalQuantity: -1 } }
    );

    const sizeData = await Sale.aggregate(pipeline);

    res.status(200).json({
      success: true,
      count: sizeData.length,
      data: sizeData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Ventas por sucursal
// @route   GET /api/analytics/by-branch
// @access  Private
export const getSalesByBranch = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.saleDate = {};
      if (startDate) dateFilter.saleDate.$gte = new Date(startDate);
      if (endDate) dateFilter.saleDate.$lte = new Date(endDate);
    }

    const branchData = await Sale.aggregate([
      { $match: { ...dateFilter, status: 'Completada' } },
      {
        $group: {
          _id: '$branch',
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          totalProfit: { $sum: '$totalProfit' },
          avgTicket: { $avg: '$totalAmount' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.status(200).json({
      success: true,
      count: branchData.length,
      data: branchData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Tendencia de ventas (por mes/día)
// @route   GET /api/analytics/sales-trend
// @access  Private
export const getSalesTrend = async (req, res, next) => {
  try {
    const { startDate, endDate, branch, groupBy = 'day' } = req.query;
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.saleDate = {};
      if (startDate) dateFilter.saleDate.$gte = new Date(startDate);
      if (endDate) dateFilter.saleDate.$lte = new Date(endDate);
    }

    let branchFilter = {};
    if (branch && branch !== 'Todas') {
      branchFilter.branch = branch;
    }

    const matchFilter = { ...dateFilter, ...branchFilter, status: 'Completada' };

    let groupFormat;
    if (groupBy === 'month') {
      groupFormat = { year: { $year: '$saleDate' }, month: { $month: '$saleDate' } };
    } else {
      groupFormat = { 
        year: { $year: '$saleDate' }, 
        month: { $month: '$saleDate' },
        day: { $dayOfMonth: '$saleDate' }
      };
    }

    const trendData = await Sale.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: groupFormat,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          totalProfit: { $sum: '$totalProfit' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.status(200).json({
      success: true,
      count: trendData.length,
      data: trendData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Recomendaciones inteligentes
// @route   GET /api/analytics/recommendations
// @access  Private
export const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = [];

    // 1. Productos con bajo stock
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$stock', '$minStock'] },
      active: true
    }).limit(5);

    if (lowStockProducts.length > 0) {
      recommendations.push({
        type: 'warning',
        priority: 'high',
        title: 'Productos con stock bajo',
        description: `${lowStockProducts.length} producto(s) necesitan reposición urgente`,
        action: 'Aumentar stock',
        products: lowStockProducts.map(p => ({
          name: p.name,
          sku: p.sku,
          stock: p.stock,
          minStock: p.minStock
        }))
      });
    }

    // 2. Productos con baja rotación (últimos 30 días)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesLast30Days = await Sale.aggregate([
      { $match: { saleDate: { $gte: thirtyDaysAgo }, status: 'Completada' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.sku',
          totalQuantity: { $sum: '$items.quantity' }
        }
      }
    ]);

    const soldSkus = new Set(salesLast30Days.map(s => s._id));
    const allProducts = await Product.find({ active: true, stock: { $gt: 5 } });
    const lowRotation = allProducts.filter(p => !soldSkus.has(p.sku)).slice(0, 5);

    if (lowRotation.length > 0) {
      recommendations.push({
        type: 'info',
        priority: 'medium',
        title: 'Productos con baja rotación',
        description: `${lowRotation.length} producto(s) no se han vendido en 30 días`,
        action: 'Aplicar descuentos promocionales',
        products: lowRotation.map(p => ({
          name: p.name,
          sku: p.sku,
          stock: p.stock,
          suggestedDiscount: '15-20%'
        }))
      });
    }

    // 3. Productos más vendidos que necesitan más stock
    const topSelling = await Sale.aggregate([
      { $match: { saleDate: { $gte: thirtyDaysAgo }, status: 'Completada' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.sku',
          name: { $first: '$items.name' },
          totalQuantity: { $sum: '$items.quantity' }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }
    ]);

    const topSellingWithStock = await Promise.all(
      topSelling.map(async (item) => {
        const product = await Product.findOne({ sku: item._id });
        return { ...item, currentStock: product?.stock || 0 };
      })
    );

    const needsRestock = topSellingWithStock.filter(p => p.currentStock < p.totalQuantity * 0.5);

    if (needsRestock.length > 0) {
      recommendations.push({
        type: 'success',
        priority: 'high',
        title: 'Productos estrella necesitan más stock',
        description: 'Productos de alta rotación que requieren reposición',
        action: 'Incrementar pedido',
        products: needsRestock.map(p => ({
          name: p.name,
          sku: p._id,
          currentStock: p.currentStock,
          soldLast30Days: p.totalQuantity,
          suggestedOrder: Math.ceil(p.totalQuantity * 1.5)
        }))
      });
    }

    res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations
    });
  } catch (error) {
    next(error);
  }
};

