import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from './../models/productModel.js';

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    status,
    paymentResult
  } = req.body;
  const user = await User.findById(req.user._id)

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Không có sản phẩm nào');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      userName: user.first_name + ' ' + user.last_name,
      shippingAddress,
      paymentMethod,
      taxPrice,
      status,
      shippingPrice,
      totalPrice,
      isPaid: (isPaid === true) ? isPaid : false,
      paidAt: (isPaid === true) ? Date.now() : '',
      paymentResult
    });

    // cập nhật lại số lượng có trong kho của mỗi sản phẩm
    orderItems.map(async(item) => {
      const product = await Product.findById(item.productId)
      if(product){
        product.countInStock = product.countInStock - item.quantity
        const updateProduct = await product.save()
      }
      else{
        res.status(404),
        res.json({
          message: 'cập nhật thất bại'
        })
      }
    })

    // thêm đơn hàng
    const createdOrder = await order.save();

    res.status(201).json({ message: 'Mua hàng thành công'});
  }
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    '_id first_name last_name email phone'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc   Get all orders
// @route  GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 5
  const page = req.query.page || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Order.countDocuments({ ...keyword });
  const orders = await Order.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ orders, page, pages: Math.ceil(count / pageSize), total_Order: count });
});

// @desc   search  order
// @route  GET /api/orders/search
// @access Private/Admin
const searchOrders = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 5
  const page = req.query.page || 1
  const filter = {}

  if(req.query.id) filter._id = req.query.id
  if(req.query.name) filter.userName = {$regex: req.query.name, $options: '$i'}
  if(req.query.paymentResult) filter.paymentResult = {$regex: req.query.paymentResult, $options: '$i'}

  const count = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .sort({ createdAt: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ orders, page, pages: Math.ceil(count / pageSize), total_Order: count });
});

// @desc   Get logged in user order
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders);
});

// @desc   delete order
// @route  delete /api/orders/:id
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    throw new Error("Đơn hàng không tồn tại", 404)
  }else{
    if(order.status !== 'Chờ xét duyệt'){
      throw new Error("Đơn hàng của bạn đang được giao! Không thể hủy đơn hàng", 401)
    }else{
      await order.remove()
      res.status(200).json({
        success: true,
        message: 'Xóa đơn hàng thành công'
      })
    }
  }
});

// @desc   update order
// @route  patch /api/orders/:id
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(order){
    if(order.paymentMethod === 'Trực tiếp'){
      order.status = req.body.status
      order.save()
      res.status(200).json({
        message: `Bạn vừa xác nhận đơn hàng có mã là ${req.params.id}`,
        order
      })
    }else{
      res.status(401).json({
        message: 'Không có quyền xác nhận'
      })
    }
  }else{
    res.status(404).json({
      message: 'Không tồn tại đơn hàng này'
    })
  }
});

export {
  addOrderItems,
  getOrders,
  getOrderById,
  getMyOrders,
  deleteOrder,
  updateOrder,
  searchOrders
}