import express from "express";
import { addReview, getReviews,deleteReview } from "../controllers/reviewControllers.js";

const router = express.Router();

// Route to add a new review
router.post("/addreview", addReview);
// Route to fetch all reviews
router.get("/getreviews", getReviews);
router.delete("/deletereview/:id", deleteReview);

export default router;
