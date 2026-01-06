// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import fetch from "node-fetch";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.DEEPSEEK_API_KEY;

// app.post("/generate-review", async (req, res) => {
//   const {
//     businessId,
//     businessName,
//     businessType,
//     tone,
//     lengthLimit,
//     highlights,
//     language,
//   } = req.body;

//   // 🔐 Validation
//   if (!businessId || !businessName || !language) {
//     return res.status(400).json({
//       error: "Missing required business data",
//     });
//   }

//   const prompt = `
// Generate a UNIQUE customer review strictly in ${language}.

// 🚨 VERY IMPORTANT – LANGUAGE RULES (NO EXCEPTIONS):

// - English → Write ONLY in English.
// - Hindi → Write ONLY in Hindi (Devanagari script).
// - Hinglish → Mix Hindi (written in English letters) + English.
// - Marathi → Write ONLY in Marathi (Devanagari script).

// ❌ Do NOT use English words in Hindi or Marathi responses.
// ❌ Do NOT use English letters for Marathi.
// ❌ Do NOT mix languages unless Hinglish is selected.

// General Rules:
// - The review must be UNIQUE every time.
// - Sound natural, human-written, and genuine.
// - Do NOT repeat earlier responses.

// Business Details:
// - Business Name: ${businessName}
// - Business Type: ${businessType || "Business"}
// - Tone: ${tone}
// - Length Limit: ${lengthLimit}
// - Key Highlights: ${highlights || "None"}

// Creativity:
// - Start with a fresh opening line.
// - End with a unique closing sentence.
// `;

//   try {
//     const response = await fetch(
//       "https://api.deepseek.com/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "deepseek-chat",
//           messages: [{ role: "user", content: prompt }],
//           max_tokens: 300,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!data.choices || !data.choices.length) {
//       return res.status(500).json({ error: "AI returned no response" });
//     }

//     res.json({
//       businessId,
//       review: data.choices[0].message.content,
//     });
//   } catch (error) {
//     console.error("DeepSeek API failed:", error.message);
//     res.status(500).json({
//       error: "DeepSeek API failed",
//       details: error.message,
//     });
//   }
// });

// // const PORT = process.env.PORT || 8080;
// const PORT = 8080;

// app.listen(PORT, () =>
//   console.log(`Backend running on port ${PORT}`)
// );

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import businessRoutes from "./routes/businessRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/businesses", businessRoutes);
app.use("/api", reviewRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);
