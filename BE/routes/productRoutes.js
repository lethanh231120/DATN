import express from 'express';
import {
  getProducts,
  getAllProducts,
  getProductsByParams,
  getAllProductReviews,
  getTrashProducts,
  getTopRatingProducts,
  getLatestProducts,
  createProduct,
  createProductReview,
  updateProduct,
  deleteProduct,
  restoreProduct,
  forceProduct
} from '../controllers/productController.js'
import { uploadMultiFile } from './uploadFile.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router();

router.get('/search', getProductsByParams)
router.route('/trash').get(protect, admin, getTrashProducts)
router.route('/top-rating').get(getTopRatingProducts)
router.route('/latest').get(getLatestProducts)

router
  .route('/')
  .get(getProducts)
  .post(protect, admin, uploadMultiFile, createProduct)

router.route('/all-products').get(protect, getAllProducts)

router
  .route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, uploadMultiFile, updateProduct);

router.get('/:id/reviews', getAllProductReviews)
router.route('/:id/review').post(protect, createProductReview);
router.route('/:id/restore').patch(protect, admin, restoreProduct)
router.route('/:id/force').delete(protect, admin, forceProduct)

export default router