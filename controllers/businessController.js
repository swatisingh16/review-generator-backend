import Business from "../models/Business.js";
import { normalizeLanguages, slugify } from "../utils/languages.js";

export const createBusiness = async (req, res) => {
    try {
        const slug = slugify(req.body.name);

        const business = await Business.create({
            ...req.body,
            slug,
            languages: normalizeLanguages(req.body.languages),
            logo: req.file ? req.file.path : null,
        });

        res.status(201).json(business);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                error: "Business with this name already exists",
            });
        }

        res.status(400).json({ error: err.message });
    }
};


export const updateBusiness = async (req, res) => {
    try {
        const updates = {
            ...req.body,
            ...(req.body.name && { slug: slugify(req.body.name) }),
            ...(req.body.languages && {
                languages: normalizeLanguages(req.body.languages),
            }),
            ...(req.file && { logo: req.file.path }),
        };

        const business = await Business.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        res.json(business);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getBusinesses = async (req, res) => {
    const businesses = await Business.find().sort({ createdAt: -1 });
    res.json(businesses);
};

export const getBusinessBySlug = async (req, res) => {
    const business = await Business.findOne({ slug: req.params.slug });

    if (!business) {
        return res.status(404).json({ error: "Business not found" });
    }

    business.visits += 1;
    await business.save();

    res.json(business);
};

export const deleteBusiness = async (req, res) => {
    try {
        await Business.findByIdAndDelete(req.params.id);
        res.json({ message: "Business deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await Business.aggregate([
      {
        $group: {
          _id: null,
          totalBusinesses: { $sum: 1 },
          totalReviewsGenerated: { $sum: "$reviewsGenerated" },
          totalVisits: { $sum: "$visits" },
        },
      },
    ]);

    res.json(
      stats[0] || {
        totalBusinesses: 0,
        totalReviewsGenerated: 0,
        totalVisits: 0,
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
