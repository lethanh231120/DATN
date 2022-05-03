import asyncHandler from 'express-async-handler';
import Wishlist from '../models/wishlistModel.js';

// @desc    get wishlist
// @route   GET /api/wishlists/
// @access  public
const getWishList = asyncHandler(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ userId: req.user._id });

  if (!wishlist) {
    return next(new Errorhander("Cart not found", 404));
  }

  res.status(200).json({
    success: true,
    products: wishlist.products
  })
})

// @desc    post wishlist
// @route   POST /api/wishlists/
// @access  public
const createWishList = asyncHandler(async (req, res) => {
  const { name, price, discount, image, productId } = req.body;
  const newWishList = {
    name,
    price,
    discount,
    image,
    userId: req.user._id,
    productId,
  }
  const wishlist = await Wishlist.findOne({ userId: req.user._id });

  if (wishlist) {
    const isWishList = wishlist.products.find(
      (pro) => pro.productId.toString() === productId.toString()
    );
    if (isWishList) {
      res.json({
        mesage: 'Sản phẩm đã tồn tại trong danh sách yêu thích',
      });
    }
    else {
      wishlist.products.push(newWishList);
    }
    await wishlist.save();
    res.status(200).json({
      success: true,
      message: 'Thêm sản phẩm vào danh sách yêu thích thành công'
    });
  } else {
    const newWishList = await Wishlist.create({
      userId: req.user._id,
      products: [{
        name,
        price,
        discount,
        image,
        productId,
      }, ],
    });

    if(newWishList){
      res.status(201).json({
        mesage: 'Thêm sản phẩm vào danh sách yêu thích thành công',
      });
    }
    else{
      res.status(400);
      throw new Error('Không tồn tại dữ liệu');
    }
  }
});

// @desc    delete wishlist
// @route   DELETE /api/wishlists/:id
// @access  public
const deleteWishList = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ userId: req.user._id });
  if(wishlist) {
    let itemIndex = wishlist.products.findIndex((pro) => pro._id.toString() === req.params.id.toString());
    if (itemIndex > -1) {
      wishlist.products.splice(itemIndex, 1);
    } else {
      return res.json({ message: "Sản phẩm không có trong danh sách yêu thích" });
    }
    wishlist = await wishlist.save();
    res.json({ message: 'Xóa sản phẩm trong danh sách yêu thích thành công' });
  }
  else{
    return next(new Errorhander("Danh sách yêu thích trống", 404));
  }
})

export {
  getWishList,
  createWishList,
  deleteWishList
}