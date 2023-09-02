const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Users = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

//Create User

exports.createUser = async (req, res) => {
  const user = await Users.create(req.body);

  res.status(201).json({
    success: true,
    user,
  });
};

// Register User

exports.registerUser = async (req, res) => {
  const {
    userName,
    userRole,
    status,
    phoneNo,
    password,
    email,
    attendance,
    address,
  } = req.body;

  const user = await Users.create({
    userName,
    userRole,
    status,
    phoneNo,
    password,
    email,
    attendance,
    address,
  });

  sendToken(user, 201, res);
};

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get All Users
exports.getAllUsers = catchAsyncErrors(async (req, res) => {
  const users = await Users.find();

  res.status(200).json({ success: true, users });
});

//
exports.getCurrentUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User Not Found ", 404));
  }

  res.status(200).json({ success: true, user });
});

// Get User Details

exports.getUserDetails = async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User Not Found ", 404));
  }

  res.status(200).json({ success: true, user });
};

//Update User
exports.updateUser = async (req, res, next) => {
  let user = await Users.findById(req.params.id);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User not found",
    });
  }

  user = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

//Delete User

exports.deleteUser = async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User not found",
    });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
};
