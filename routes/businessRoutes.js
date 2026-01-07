import express from "express";
import {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} from "../controllers/businessController.js";

const router = express.Router();

import upload from "../middlewares/upload.js";

router.post("/", upload.single("logo"), createBusiness);
router.put("/:id", upload.single("logo"), updateBusiness);
router.get("/", getBusinesses);
router.get("/:id", getBusinessById);
router.delete("/:id", deleteBusiness);

export default router;
