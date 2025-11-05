import express from 'express';
import { getSales, createSale, getSaleById } from '../controllers/saleController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getSales);
router.post('/', isAuthenticated, createSale);
router.get('/:id', isAuthenticated, getSaleById);

export default router;

