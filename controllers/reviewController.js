import Business from "../models/Business.js";

export const generateReview = async (req, res) => {
  const {
    businessId,
    businessName,
    businessType,
    tone,
    lengthLimit,
    highlights,
    language,
  } = req.body;

  if (!businessName || !language) {
    return res.status(400).json({ error: "Missing required data" });
  }

  const prompt = `Generate a UNIQUE customer review strictly in ${language}
  General Rules:
- The review must be UNIQUE every time.
- Sound natural, human-written, and genuine.
- Do NOT repeat earlier responses.

Business Details:
- Business Name: ${businessName}
- Business Type: ${businessType || "Business"}
- Tone: ${tone}
- Length Limit: ${lengthLimit}
- Key Highlights: ${highlights || "None"}

Creativity:
- Start with a fresh opening line.
- End with a unique closing sentence.
`;

  try {
    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 300,
        }),
      }
    );

    const data = await response.json();

    await Business.findByIdAndUpdate(businessId, {
      $inc: { reviewsGenerated: 1 },
    });

    res.json({ review: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "AI generation failed" });
  }
};
