import asyncHandler from "express-async-handler";
import Blog from '../models/blogModel.js'

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ productId: req.body.productId, deleted: false });
  if(blog){
    res.status(409)
    res.json({
      message: 'Bài viết cho sản phẩm này đã tồn tại'
    })
  }
  else{
    const newBlog = Blog.create({
      ...req.body,
      user: req.user._id,
    });

    if(newBlog){
      res.status(201).json({
        mesage: 'Tạo mới bài viết thành công',
      });
    }
    else{
      res.status(400);
      throw new Error('Dữ liệu không hợp lệ');
    }
  }
});

// @desc   Get all blog
// @route  GET /api/blogs
// @access public
const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 8
  const page = req.query.page || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Blog.countDocuments({ ...keyword });
  const blogs = await Blog.find({ ...keyword })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ blogs, page, pages: Math.ceil(count / pageSize), total_Blog: count });
});

// @desc   Get blog by userId
// @route  GET /api/blogs/userId:userId
// @access public
const getBlogsByUserId = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 8
  const page = req.query.page || 1
  const count = await Blog.countDocuments({ user: req.params.userId });
  const blogs = await Blog.find({ user: req.params.userId })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ blogs, page, pages: Math.ceil(count / pageSize), total_Blog: count });
});

// @desc   Get trash blog
// @route  GET /api/blogs/trash
// @access Private/Admin
const getTrashBlogs = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 8
  const page = req.query.page || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Blog.findDeleted({ ...keyword });
  console.log(count.length)
  const blogs = await Blog.findDeleted({ ...keyword })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ blogs, page, pages: Math.ceil(count.length / pageSize), total_Blog: count.length });
});

// @desc    Get blog by productID
// @route   GET /api/blogs/productId/:productId
// @access  Public
const getBlogByProductId = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ productId: req.params.productId });
  if (blogs) {
    res.json({
      data: blogs,
      total_blog: blogs.length
    });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog)
    res.status(200);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { name, title, content, productId, image } = req.body;
  const blog = await Blog.findById(req.params.id);
  console.log(req.params.id)

  if (blog) {
    blog.name = name;
    blog.image = image;
    blog.title = title;
    blog.content = content;
    blog.productId = productId;

    await blog.save();
    res.json({
      message: 'Update blog Successfully'
    });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }

});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.delete({ _id: req.params.id})
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    restore a blog
// @route   PATCH /api/blogs/:id/restore
// @access  Private/Admin
const restoreBlog = asyncHandler(async (req, res) => {
  await Blog.restore({ _id: req.params.id})
  res.json({ message: 'Blog restored' });
});

// @desc    Delete force a Blog
// @route   DELETE /api/blogs/:id/force
// @access  Private/Admin
const forceBlog = asyncHandler(async (req, res) => {
  await Blog.deleteOne({ _id: req.params.id})
  res.json({ message: 'Blog removed' });
});

export {
  getBlogs,
  createBlog,
  getBlogById,
  getBlogByProductId,
  deleteBlog,
  updateBlog,
  getTrashBlogs,
  restoreBlog,
  forceBlog,
  getBlogsByUserId
}
