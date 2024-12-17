import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/emailService.js";

export const register = catchAsyncErrors(async (req, res, next) => {

  console.log("Request Body:", req.body);

  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill all the fields."));
  }
  // console.log("all fields");

  const isEmail = await User.findOne({ email });
  console.log(isEmail);
  if (isEmail) {
    // console.log("found");
    return next(new ErrorHandler("Email already registered!",400));
  }
  // console.log("new email found");


  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  await sendEmail(email, 'Registration Successful', `Welcome ${name}, you have successfully registered in Seek&Work!`);

  sendToken(user, 201, res, "User Registered Successfully!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill all the fields."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email not found! Kindly register first.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }

  // await sendEmail(email, 'Login Successful', `Hello ${user.name}, you have successfully logged in!`);

  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const profile = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = req.user; // Assuming the `isAuthenticated` middleware populates `req.user`

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});
export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, role } = req.body;

  // Find the user by their ID (this is populated by authenticateToken middleware)
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Update the user's information if provided
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (role) user.role = role;

  // Save the updated user object
  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    user: updatedUser, // Send the updated user data in the response
  });
});



export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find(); 
  if (!users || users.length === 0) {
    return next(new ErrorHandler("No users found", 404)); 
  }

  res.status(200).json({
    success: true,
    users, 
  });
});

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
// console.log(userId)
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404)); 
  }

  // await user.remove();
  await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  });
});
