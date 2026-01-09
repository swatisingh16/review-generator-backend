import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    type: String,
    card: String,
    keywords: String,
    city: String,
    state: String,
    address: String,
    email: String,
    phone: String,
    website: String,
    about: String,
    reviewLink: { type: String, required: true },
    logo: String,
    languages: [String],
    visits: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    reviewsGenerated: { type: Number, default: 0 },
  },
  { timestamps: true }
);


export default mongoose.model("Business", businessSchema);
