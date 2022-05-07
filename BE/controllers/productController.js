import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js'
import cloudinary from 'cloudinary'

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const files = req.files

  let imagesLinks = []
  for (let i = 0; i < files.length; i++) {
    const result = await cloudinary.v2.uploader.upload(files[i].path, {
      folder: "products",
    });
    imagesLinks.push(result.secure_url);
  }

  const product = Product.create({
    user: req.user._id,
    name: req.body.name,
    listImage: files && imagesLinks,
    categoryId: req.body.categoryId && req.body.categoryId,
    description: req.body.description && req.body.description,
    weight: req.body.weight && req.body.weight,
    dimensions: req.body.dimensions && req.body.dimensions,
    reviews: [],
    rating: req.body.rating && req.body.rating,
    discount: req.body.discount && req.body.discount,
    numberOfReViews: 0,
    price: req.body.price && req.body.price,
    countInStock: req.body.countInStock && req.body.countInStock,
  });

  if(product){
    res.status(201).json({
      mesage: 'Create Product Successfully',
    });
  }
  else{
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc   Get all product
// @route  GET /api/products
// @access Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .sort({ name: 1 })
  res.json({ products });
});

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 10
  const page = req.query.page || 1
  const sort = req.query.sort || '';
  const sortProducts =
    sort === 'lowest'
      ? { rating: 1 }
      : sort === 'highest'
      ? { rating: -1 }
      : sort === ''
      ? { price: 1 }
      : { updatedAt: -1 };
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .sort(sortProducts)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize), total_Product: count });
});

// @desc   get trash products
// @route  GET /api/products/trash
// @access private
const getTrashProducts = asyncHandler(async (req, res) => {
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
  const count = await Product.findDeleted({ ...keyword });
  console.log(count.length)
  const products = await Product.findDeleted({ ...keyword })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count.length / pageSize), total_Product: count.length });
});

// @desc    Get top rated products
// @route   GET /api/products/top rating
// @access  Public
const getTopRatingProducts = asyncHandler(async (req, res) => {
  const size = req.query.size || 10
  const products = await Product.find({}).sort({ rating: -1 }).limit(size);
  res.json({
    data: products,
    total_product: products.length
  });
});

// @desc    Get top rated products
// @route   GET /api/products/top rating
// @access  Public
const getLatestProducts = asyncHandler(async (req, res) => {
  const size = req.query.size || 5
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(size);
  res.json({
    data: products,
    total_product: products.length
  });
});

// @desc    Get top rated products
// @route   GET /api/products/params
// @access  Public
const getProductsByParams = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 8
  const page = req.query.page || 1
  const filter = {}
  const params = req.query.price ? req.query.price : ''
  const priceSearch = params.split(',')

  if(req.query.id) filter._id = req.query.id
  if(req.query.name) filter.name = {$regex: req.query.name, $options: '$i'}
  if(req.query.categoryId) filter.categoryId = req.query.categoryId
  if(req.query.price) filter.price = {
    $gte: Number(priceSearch[0]),
    $lte: Number(priceSearch[1])
  }

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort({ price: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (products) {
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total_Category: count
    });
  } else {
    res.status(404);
    throw new Error('Không có sản phẩm');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.delete({ _id: req.params.id})
    res.json({ message: 'Xóa sản phẩm thành công' });
  } else {
    res.status(404);
    throw new Error('Không tồn tại sản phẩm');
  }
});

//patch/:id/restore
const restoreProduct = asyncHandler(async (req, res) => {
  await Product.restore({ _id: req.params.id})
  res.json({ message: 'Product restored' });
});

// @desc    Delete a Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const forceProduct = asyncHandler(async (req, res) => {
  await Product.deleteOne({ _id: req.params.id})
  res.json({ message: 'Product removed' });
});


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, weight, dimensions, categoryId, countInStock, discount } =
    req.body;
  const files = req.files

  let imagesLinks = []
  for (let i = 0; i < files.length; i++) {
    const result = await cloudinary.v2.uploader.upload(files[i].path, {
      folder: "products",
    });
    imagesLinks.push(result.secure_url);
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.listImage = files && imagesLinks,
    product.price = price || product.price;
    product.description = description || product.description;
    product.weight = weight || product.weight;
    product.dimensions = dimensions || product.dimensions;
    product.discount = discount || product.discount;
    product.categoryId = categoryId || product.categoryId;
    product.countInStock = countInStock || product.countInStock;

    await product.save();
    res.json({
      message: 'Update Product Successfully'
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }

});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
//Đánh giá sản phẩm ( xếp hạng, bình luận) tạo mới và update
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const review = {
    name: req.user.first_name + req.user.last_name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  }
  const product = await Product.findById(req.params.id);
  if (product) {
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    // Kiểm tra 1 user đánh giá thì đánh giá mới nhất sễ được gán cho đánh giá đằng trước

    if (isReviewed) {
      product.reviews.forEach(rev => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating),
          (rev.comment = comment)
        }
      });
    }
    else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length
    }
    //Tính trung bình Rating của sản phẩm được đánh giá

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(200).json({
      success: true,
      message: `Đánh giá sản phẩm ${product.name} thành công`
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    get new review
// @route   GET /api/products/reviews
// @access  Private
//Get All Reviews Product
const getAllProductReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

// @desc   statistical product
// @route  get /api/products/statistical
// @access public
const statisticalProduct = asyncHandler(async (req, res) => {
  const perMonth = req.query.perMonth
  const filter = {}

  const date_to = new Date();
  const currMonth = date_to.getMonth()
  const currDay = date_to.getDate()

  const date_from = new Date();
  date_from.setDate(currDay)
  date_from.setMonth(currMonth - perMonth)

  if(req.query.perMonth) filter.createdAt = {
    $gte: date_from,
    $lte: date_to
  }

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
  res.json({
    products,
    total_Product: count
  })
});

export {
  getProducts,
  getAllProducts,
  getTopRatingProducts,
  getProductsByParams,
  getAllProductReviews,
  getTrashProducts,
  getLatestProducts,
  createProduct,
  createProductReview,
  updateProduct,
  deleteProduct,
  restoreProduct,
  forceProduct,
  statisticalProduct
}
