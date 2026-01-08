import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/cloudinary.js";

import businessRoutes from "./routes/businessRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/businesses", businessRoutes);
app.use("/api", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Tapitkardz backend is running 🚀");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
