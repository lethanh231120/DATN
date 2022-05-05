import express from 'express';
const router = express.Router();
import { uploadFile, uploadMultiFile } from './uploadFile.js'
import {
  getBlogs,
  createBlog,
  getBlogByProductId,
  getBlogById,
  deleteBlog,
  updateBlog,
  getTrashBlogs,
  restoreBlog,
  forceBlog,
  getBlogsByUserId
} from '../controllers/blogController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .post(protect, admin, createBlog)
  .get(getBlogs)

router.route('/userId/:userId').get(getBlogsByUserId)
router.route('/trash').get(getTrashBlogs)

router
  .route('/:id')
  .get(getBlogById)
  .delete(protect, admin, deleteBlog)
  .put(protect, admin, updateBlog);

router.route('/:id/restore').patch(protect, admin, restoreBlog)
router.route('/:id/force').delete(protect, admin, forceBlog)
router.route('/productId/:productId').get(protect, getBlogByProductId)

export default router