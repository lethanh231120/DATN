import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateAuthToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import generator from 'generate-password'
import cloudinary from 'cloudinary'

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      name: user.first_name+user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateAuthToken(user._id),
      message: 'login thành công!',
    })
  }else{
    res.status(401)
    throw new Error('Email hoặc mật khẩu không chính xác')
  }
})

//Logout User
const logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
    token: ''
  })
})

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, isAdmin, password } = req.body

  let myCloud
  if(req.file !== undefined){
    myCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "image",
      width: 150,
      crop: "scale",
    });
  }

  const user = User.create({
    ...req.body,
    image: req.file ? myCloud.secure_url : '',
    isWork: true,
    isAdmin: isAdmin || false,
  })

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('Email đã tồn tại');
  }

  if(user){
    const loginURL = `${process.env.FRONEND_URL}/login`;
    await sendEmail({
      email: email,
      subject: `Bạn vừa đăng ký tài khoản ANDROLIN`,
      message: `Thông tin tài khoản của bạn:`,
      html: `<h5>email: ${email}</h5> <h5>password: ${password}</h5> <a href=${loginURL}>Đăng nhập ngay</a>`,
    })
    res.status(201).json({
      message: 'Đăng ký thành công'
    });
  }
  else{
    res.status(400);
    throw new Error('Không tồn tại dữ liệu');
  }
})

// @desc    search user
// @route   GET /api/users/search
// @access  admin
const searchUser = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 5
  const page = req.query.page || 1

  const filter = {}
  if(req.query.name) filter.last_name = {$regex: req.query.name, $options: '$i'}

  const count = await User.countDocuments(filter);
  const users = await User.find(filter)
    .sort({ price: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (users) {
    res.json({
      users,
      page,
      pages: Math.ceil(count / pageSize),
      total_User: count
    });
  }
});

// @desc    Get trash users
// @route   GET /api/users/trash
// @access  private admin
const getTrashUsers = asyncHandler(async (req, res) => {
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
  const count = await User.findDeleted({ ...keyword });
  const users = await User.findDeleted({ ...keyword })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count.length / pageSize), total_User: count.length });
});

// @desc   Get all admin
// @route  GET /api/admins
// @access public
const getAdmins = asyncHandler(async (req, res) => {
  const admin = await User.find({ isAdmin: true });
  res.json({
    data: admin,
    totalUser: admin.length
  })
});

// @desc   Get user info
// @route  GET /api/userInfo
// @access public
const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    res.json({
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        image: user.image,
        address: user.address,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      }
    })
  }
  else{
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      image: user.image,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc   Update user profile
// @route  PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  let myCloud
  if(req.file !== undefined){
    myCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "image",
      width: 150,
      crop: "scale",
    });
  }

  if (user) {
    user.image = req.file ? myCloud.secure_url : user.image;
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    user.password = user.password
    user.isWork = user.isWork
    user.isAdmin = user.isAdmin

    await user.save();

    res.json({
      message: 'Cập nhật thông tin thành công!'
    });
  } else {
    res.status(404);
    throw new Error('Tài khoản không tồn tại');
  }
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if(user.isAdmin){
      res.status(405)
      throw new Error('Bạn không có quyền xóa các tài khoản admin khác')
    }else{
      await User.delete({ _id: req.params.id})
      res.json({ message: 'Xóa user thành công' });
    }
  } else {
    res.status(404);
    throw new Error('Tài khoản user không tồn tại');
  }
});

//patch/:id/restore
const restoreUser = asyncHandler(async (req, res) => {
  await User.restore({ _id: req.params.id})
  res.json({ message: 'User restored' });
});

// @desc    Delete a user
// @route   DELETE /api/user/:id
// @access  Private/Admin
const forceUser = asyncHandler(async (req, res) => {
  await User.deleteOne({ _id: req.params.id})
  res.json({ message: 'User removed' });
});

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Không tồn tại user');
  }
});

// @desc   Update user
// @route  PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  const myCloud = await cloudinary.uploader.upload(req.file.path, {
    folder: "image",
    width: 150,
    crop: "scale",
  });

  if (user) {
    user.image = req.file ? myCloud.secure_url : user.image;
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    user.isAdmin = user.isAdmin

    const updatedUser = await user.save();

    res.json({
      message: `Update user ${updatedUser._id} successfully`
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// forgot password
const forgotPassword = (asyncHandler( async(req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email: email })
  if(user){
    const password = generator.generate({
      length: 10,
      numbers: true
    });
    user.password = password
    await user.save();

    const loginURl = `${process.env.FRONEND_URL}/login`;
    await sendEmail({
      email: email,
      subject: `Lấy lại mật khẩu`,
      html: `Mật khẩu mới của bạn là ${password}. <a href=${loginURl}>Đăng nhập lại</a>`,
    })

    res.status(200).json({
      success: true,
      email,
      password,
      message: `Mật khẩu đã được gửi tới Email:${user.email}! Vui lòng kiểm tra email của bạn`
    })
  }else{
    res.status(401)
    throw new Error("Tài khoản không tồn tại");
  }
}))

//update password
const updatePassword = (asyncHandler( async(req, res) => {
  const user = await User.findById(req.user._id);
  const isPasswordMatched = await user.matchPassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    res.status(400)
    throw new Error("Mật khẩu cũ không chính xác");
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    res.status(400)
    throw new Error("Mật khẩu không đúng! Vui lòng nhập lại");
  }

  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: `Cập nhật mật khẩu thành công`
  })
}))

// @desc   statistical user
// @route  get /api/users/statistical
// @access public
const statisticalUser = asyncHandler(async (req, res) => {
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

  const count = await User.countDocuments(filter);
  const users = await User.find(filter)
    .sort({ createdAt: -1 })
  res.json({
    users,
    total_User: count,
    perMonth : typeof(perMonth)
  })
});

export {
  authUser,
  logout,
  getAdmins,
  registerUser,
  getTrashUsers,
  getUserInfo,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  restoreUser,
  forceUser,
  getUserById,
  updateUser,
  forgotPassword,
  updatePassword,
  searchUser,
  statisticalUser
}
