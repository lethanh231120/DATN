import express from 'express';
const router = express.Router();
import { getWishList, createWishList, deleteWishList } from '../controllers/wishlistController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getWishList).post(protect, createWishList)
router.route('/:id').delete(protect, deleteWishList)

export default router