import express from "express";
import {
  createBusiness,
  getBusinesses,
  updateBusiness,
  deleteBusiness,
  getBusinessBySlug,
  getDashboardStats,
} from "../controllers/businessController.js";

const router = express.Router();

import upload from "../middlewares/upload.js";

router.post("/", upload.single("logo"), createBusiness);
router.put("/:id", upload.single("logo"), updateBusiness);
router.get("/", getBusinesses);
router.get("/slug/:slug", getBusinessBySlug); 
router.delete("/:id", deleteBusiness);
router.get("/stats/dashboard", getDashboardStats);

export default router;
