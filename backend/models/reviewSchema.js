import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: {
      validator: function (value) {
        return (
          value.endsWith("@gmail.com") || value.endsWith("@chitkara.edu.in")
        );
      },
      message: "Please provide a valid Email!!",
    },
  },
  phone: {
    type: Number,
    minLength: 10,
    maxLength: 10,
    required: [true, "Please enter your Phone Number!"],
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  suggestion: { type: String, required: true },
});


export const Review = mongoose.model("Review", reviewSchema);