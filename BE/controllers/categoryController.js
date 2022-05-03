import asyncHandler from "express-async-handler";
import Category from '../models/categoryModel.js'
import Product from './../models/productModel.js';

// @desc  Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  await category.save();
  res.status(201).json({
    message: 'Create Category Successfully'
  });
});

// @desc   Get all category
// @route  GET /api/categories
// @access public
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()
    .sort({ name: 1 })
  res.json({ categories });
});

// @desc   Get all category by params
// @route  GET /api/categories
// @access Private/Admin
const getCategories = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 6
  const page = req.query.page || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Category.countDocuments({ ...keyword });
  const categories = await Category.find({ ...keyword })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ categories, page, pages: Math.ceil(count / pageSize), total_Category: count });
});

// @desc   search  category
// @route  GET /api/categories/search
// @access Private/Admin
const searchCategories = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 5
  const page = req.query.page || 1

  const count = await Category.countDocuments({ name: {$regex: req.query.name, $options: '$i'}});
  const categories = await Category.find({ name: {$regex: req.query.name, $options: '$i'}})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ categories, page, pages: Math.ceil(count / pageSize), total_Category: count });
});

// @desc   get trash category
// @route  GET /api/categories/trash
// @access Private/Admin
const getTrashCategories = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 6
  const page = req.query.page || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Category.findDeleted({ ...keyword });
  const categories = await Category.findDeleted({ ...keyword })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ categories, page, pages: Math.ceil(count.length / pageSize), total_Category: count.length });
});

// @desc   get category by Id
// @route  GET /api/categories/:id
// @access private/admin
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Không tồn tại danh mục');
  }
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name ? name : category.name;

    await category.save();
    res.json({
      message: 'Update Category Successfully'
    });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    sort Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const product = await Product.find({ categoryId: req.params.id })
  if(product.length !== 0){
    res.status(406)
    res.json({
      message: 'không thể xóa danh mục này'
    })
  }else{
    if (category) {
      await Category.delete({ _id: req.params.id})
      res.json({ message: 'Xóa danh mục thành công' });
    } else {
      res.status(404);
      throw new Error('Không tồn tại danh mục này');
    }
  }
});

// @desc    force Delete a category
// @route   DELETE /api/categories/:id/force
// @access  Private/Admin
const forceCategory = asyncHandler(async (req, res) => {
  await Category.deleteOne({ _id: req.params.id})
  res.json({ message: 'Category removed' });
});

// @desc    restore a category
// @route   PATCH /api/categories/:id/restore
// @access  Private/Admin
const restoreCategory = asyncHandler(async (req, res) => {
  await Category.restore({ _id: req.params.id})
  res.json({ message: 'Category restored' });
});

export {
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
}
