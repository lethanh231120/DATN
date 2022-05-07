import express from 'express';
import {
  getTrashUsers,
  getAdmins,
  registerUser,
  authUser,
  logout,
  getUserInfo,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
  restoreUser,
  forceUser,
  forgotPassword,
  updatePassword,
  searchUser,
  statisticalUser
} from '../controllers/userController.js'
import { uploadFile } from './uploadFile.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router();

router
  .route('/users')
  .post(uploadFile, registerUser)
  .get(protect, admin, searchUser)

router.route('/users/statistical').get(protect, admin, statisticalUser)
router.route('/users/forgot-password').post(forgotPassword)
router.route('/user/change-password').put(protect, updatePassword)
router.route('/users/trash').get(protect, admin, getTrashUsers)
router.route('/users/:id/restore').patch(protect, admin, restoreUser)
router.route('/users/:id/force').delete(protect, admin, forceUser)
router.route('/admins').get(getAdmins)
router.route('/users/search').get(protect, admin, searchUser)
router.post('/user/login', authUser)
router.get('/user/logout', logout)
router.get('/user/info', protect, getUserInfo)

router.route('/user/profile').get(protect, getUserProfile).put(protect, uploadFile, updateUserProfile)

router
  .route('/users/:id')
  .get(getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, uploadFile, updateUser)

export default router