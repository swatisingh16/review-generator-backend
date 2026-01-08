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

export const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
