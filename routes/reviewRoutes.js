import express from "express";
import { generateReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/generate-review", generateReview);

export default router;
