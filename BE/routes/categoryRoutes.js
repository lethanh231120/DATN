import express from 'express';
const router = express.Router();
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getTrashCategories,
  restoreCategory,
  forceCategory,
  getAllCategories,
  searchCategories
} from '../controllers/categoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getCategories).post(protect, admin, createCategory)
router.route('/all-categories').get(getAllCategories)
router.route('/trash').get(protect, admin, getTrashCategories)
router.route('/search').get(protect, admin, searchCategories)

router
  .route('/:id')
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory)

router.route('/:id/force').delete(protect, admin, forceCategory)
router.route('/:id/restore').patch(protect, admin, restoreCategory)

export default router