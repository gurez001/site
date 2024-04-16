const catchAsyncError = require("../middleware/catchAsyncError");
const userCountModel = require("../models/CountModel");
const user = require("../models/userModels");
const ErrorHandler = require("../utils/errorhandler");
const { generate_Otp, verify_otp } = require("../utils/generatOtp");
const sendToken = require("../utils/jwtToken");
const {
  sendOtpMail,
  forgetPassOtpMail,
  forget_password_mail,
} = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const master_otp_model = require("../models/master_otp_model");
const { valid_email_or_no } = require("../utils/validate_user");
const { mobile_otp } = require("../utils/mobile_sms");
// const crypto = require('crypto')

//--------------------Ragister user

exports.singupUser = catchAsyncError(async (req, res, next) => {
  const count = await userCountModel.findOne({ entityName: "User" });
  const { userDetails } = req.body;
  const { name, user_id, uuid, password } = userDetails;
  const is_valid_user = await valid_email_or_no(user_id);

  if (is_valid_user === "invalid") {
    return next(new ErrorHandler("Invalid email or phone number", 400));
  }

  const isExist = await user.findOne({ user_id });

  if (isExist && isExist.is_verified !== "Inactive") {
    return next(new ErrorHandler("User already exists"));
  }

  let new_user;
  if (!isExist) {
    new_user = await user.create({
      _id: count && count.count !== null ? count.count : 1,
      uuid,
      name,
      user_id,
      password,
    });
  }

  const user_uuid = isExist ? isExist.uuid : new_user.uuid;

  const otp = await generate_Otp(6, user_uuid);
  const msg = `test otp valid for 5 mints ${otp}`;
  if (is_valid_user === "Phone_no") {
    await mobile_otp(user_id, msg);
  }
  await sendOtpMail(otp);
  // sendToken(newUser, 201, res);

  res.status(200).json({
    success: true,
    user_uuid,
    message: "OTP sent to your email successfully.",
  });
});

//----------resend--otp

exports.reSendOtp = catchAsyncError(async (req, res, next) => {
  const User = await user.findOne({ uuid: req.query.user_uuid });

  const otp = await generate_Otp(6, req.query.user_uuid);
  const msg = `test otp valid for 5 mints ${otp}`;

  await mobile_otp(User.user_id, msg);

  await sendOtpMail(otp);
  res.status(200).json({
    success: true,
    message: "Otp Send",
  });
});

//-------otp veryfication

exports.otpVerification = catchAsyncError(async (req, res, next) => {
  const count = await userCountModel.findOne({ entityName: "User" });
  const { uuid, otp } = req.body;

  const isValidOTP = await verify_otp(otp, uuid);

  if (!isValidOTP) {
    return next(new ErrorHandler("Otp not valid", 400));
  }
  const User = await user.findOne({ uuid });
  User.is_verified = "Active";
  await User.save();
  sendToken(User, 201, res);
});

// //--------------------login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { user_id, password } = req.body;
  if (!user_id || !password) {
    return next(new ErrorHandler("Please valied email $ password", 400));
  }
  const User = await user.findOne({ user_id }).select("+password");

  if (User && User.is_verified !== "Active") {
    return next(new ErrorHandler("User is not exists"));
  }

  if (!User || !password) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPassMatch = await User.comparePassword(password);
  if (!isPassMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(User, 200, res);
});

// //--------------------------logout

exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out ",
  });
});

// //----------------- forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { user_id } = req.body;
  const is_valid_user = await valid_email_or_no(user_id);
  
  if (is_valid_user === "invalid") {
    return next(new ErrorHandler("Invalid email or phone number", 400));
  }

  const isExist = await user.findOne({ user_id });

  if (!isExist) {
    return next(new ErrorHandler("User is not exists"));
  }
  if (isExist && isExist.is_verified !== "Active") {
    return next(new ErrorHandler("User is not exists"));
  }

  const user_uuid = isExist.uuid;

  const otp = await generate_Otp(6, user_uuid);

  await forget_password_mail(isExist, is_valid_user, otp);

  return res.status(200).json({
    success: true,
    user_uuid,
  });
});

//--------------change password

exports.changePassword = catchAsyncError(async (req, res, next) => {
  const token = req.params.token;
  const { newPassword, confirmpassword } = req.body;

  if (newPassword !== confirmpassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords not match",
    });
  }

  const decoded = jwt.verify(token, process.env.JWTSECRET);
  const User = await user.findById(decoded.user);

  if (!User) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  User.password = hashedPassword;
  await User.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
  // } catch (err) {
  //   if (err.name === "TokenExpiredError") {
  //     // Handle token expiration error
  //     return res.status(401).json({
  //       success: false,
  //       message: "Token expired. Please request a new token.",
  //     });
  //   }
  //   return res.status(500).json({
  //     success: false,
  //     message: "Internal server error.",
  //   });
  // }
});

//-------------------------reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const token = req.params.token;

  res.status(200).json({
    success: true,
  });
});

// //------------ get user details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.user.id);

  res.status(200).json({
    success: true,
    User,
  });
});

// //------------ Update and change password

exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.user.id).select("+password");

  const isPassMatch = await User.comparePassword(req.body.oldPassword);

  if (!isPassMatch) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password dose not match", 400));
  }

  User.password = req.body.newPassword;
  await User.save();
  sendToken(User, 200, res);
});

// //--------- update profile

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const { name, email, avatar } = req.body;

  const avatarPath = avatar ? avatar : req.file.path;
  console.log(avatarPath);
  const data = {
    name,
    email,
    avatar: avatarPath,
  };
  const User = await user.findByIdAndUpdate(req.user.id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfull",
  });
});

//------------- get all user (--Admin--)

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const Users = await user.find();

  res.status(200).json({
    success: true,
    Users,
  });
});

//------------- get users details (--Admin--)

exports.getSingleUsers = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.params.id);
  if (!User) {
    res.status(404).json({
      success: false,
      message: "User dose not exist with id params",
    });
  }

  res.status(200).json({
    success: true,
    User,
  });
});

//--------- update user role-------(--Admin--)

exports.updateAdminUserRole = catchAsyncError(async (req, res, next) => {
  const NewUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const User = await user.findByIdAndUpdate(req.params.id, NewUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfull,",
    User,
  });
});

//--------- Delete profile-------(--Admin--)

exports.deleteAdminUserRole = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.params.id);

  if (!User) {
    res.status(404).json({
      success: false,
      message: `User Dose not exist with id: ${req.params.id} `,
    });
  }

  await User.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "User removed by admin",
  });
});
