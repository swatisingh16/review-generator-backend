import Business from "../models/Business.js";

// utils/languages.js
export const normalizeLanguages = (languages) => {
    if (!languages) return [];
    if (Array.isArray(languages)) return languages;
    if (typeof languages === "string") {
        try {
            const parsed = JSON.parse(languages);
            if (Array.isArray(parsed)) return parsed;
            return [parsed];
        } catch {
            return languages.split(",").map((l) => l.trim()).filter(Boolean);
        }
    }
    return [];
};

export const createBusiness = async (req, res) => {
    try {
        const business = await Business.create({
            ...req.body,
            languages: normalizeLanguages(req.body.languages),
            logo: req.file ? `/uploads/${req.file.filename}` : null,
        });

        res.status(201).json(business);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getBusinesses = async (req, res) => {
    const businesses = await Business.find().sort({ createdAt: -1 });
    res.json(businesses);
};

export const getBusinessById = async (req, res) => {
    const business = await Business.findById(req.params.id);
    if (!business) {
        return res.status(404).json({ error: "Business not found" });
    }

    business.visits += 1;
    await business.save();

    res.json(business);
};

export const updateBusiness = async (req, res) => {
    try {
        const updates = {
            ...req.body,
            ...(req.body.languages !== undefined && {
                languages: normalizeLanguages(req.body.languages),
            }),
            ...(req.file && { logo: `/uploads/${req.file.filename}` }),
        };

        const business = await Business.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        res.json(business);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteBusiness = async (req, res) => {
    try {
        await Business.findByIdAndDelete(req.params.id);
        res.json({ message: "Business deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
