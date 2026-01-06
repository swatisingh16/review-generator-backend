import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();  

const API_KEY = process.env.DEEPSEEK_API_KEY;
console.log("API_KEY:", API_KEY); 

(async () => {
  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: "Hello test" }],
        max_tokens: 5
      })
    });

    const data = await res.json();
    console.log("Success:", data);

  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
})();
