import express from 'express';
import {
  getDashboard,
  getTopProducts,
  getSalesByCategory,
  getSalesByGender,
  getSalesBySize,
  getSalesByBranch,
  getSalesTrend,
  getRecommendations
} from '../controllers/analyticsController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', isAuthenticated, getDashboard);
router.get('/top-products', isAuthenticated, getTopProducts);
router.get('/by-category', isAuthenticated, getSalesByCategory);
router.get('/by-gender', isAuthenticated, getSalesByGender);
router.get('/by-size', isAuthenticated, getSalesBySize);
router.get('/by-branch', isAuthenticated, getSalesByBranch);
router.get('/sales-trend', isAuthenticated, getSalesTrend);
router.get('/recommendations', isAuthenticated, getRecommendations);

export default router;

