import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Admin } from "../models/adminSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

// Admin Registration
export const registerAdmin = catchAsyncErrors(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return next(new ErrorHandler("Please provide name and password!", 400));
  }

  const adminExists = await Admin.findOne({ name });
  if (adminExists) {
    return next(new ErrorHandler("Admin already exists with this name!", 400));
  }

  const admin = await Admin.create({
    name,
    password,
  });

  sendToken(admin, 201, res, "Admin Registered Successfully!");
});

// Admin Login
export const loginAdmin = catchAsyncErrors(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return next(new ErrorHandler("Please provide name and password!", 400));
  }

  const admin = await Admin.findOne({ name }).select("+password");
  if (!admin) {
    return next(new ErrorHandler("Invalid name or password!", 400));
  }

  const isPasswordMatched = await admin.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid name or password!", 400));
  }

  sendToken(admin, 200, res, "Admin Logged In!");
});

// Admin Logout
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});
export const getAdmin = catchAsyncErrors((req, res, next) => {
  const admin = req.admin;

  res.status(200).json({
    success: true,
    admin,
  });
});
