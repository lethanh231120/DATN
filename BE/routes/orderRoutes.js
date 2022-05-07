import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  addOrderItems,
  getOrders,
  getOrderById,
  getMyOrders,
  deleteOrder,
  updateOrder,
  searchOrders,
  statisticalOrder
} from '../controllers/orderController.js'
const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/search').get(protect, admin, searchOrders);
router.route('/statistical').get(protect, admin, statisticalOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id').delete(protect, deleteOrder);
router.route('/:id').patch(protect, admin, updateOrder);
export default router