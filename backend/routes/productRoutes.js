import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} from '../controllers/productController.js';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getProducts);
router.get('/alerts/low-stock', isAuthenticated, getLowStockProducts);
router.get('/:id', isAuthenticated, getProductById);
router.post('/', isAuthenticated, authorizeRoles('admin', 'manager'), createProduct);
router.put('/:id', isAuthenticated, authorizeRoles('admin', 'manager'), updateProduct);
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), deleteProduct);

export default router;

