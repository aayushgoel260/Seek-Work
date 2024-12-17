import { Review } from "../models/reviewSchema.js";

// Controller to add a new review
export const addReview = async (req, res) => {
  const { name, email, phone, rating, suggestion } = req.body;

  try {
    // Creating a new review
    const review = await Review.create({ name, email, phone, rating, suggestion });

    res.status(201).json({
      success: true,
      message: "Thank you for your feedback!",
      data: review,
    });
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } catch (error) {
    console.error("Error deleting review:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete the review. Please try again later.",
    });
  }
};