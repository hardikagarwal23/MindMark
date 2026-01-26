import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    console.error("OpenRouter API key missing");
    return res.status(500).json({ error: "No API key." });
  }

  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'No description.' });
  }

  try {

    const systemMessage = `Task: Generate a JSON object with exactly two keys: "caption" and "content".
Rules:
1. "caption": A catchy, high-impact one-liner (no markdown).
2. "content": A well-structured entry based on user intent (emotional=warm, news=formal).
3. Constraints: NO markdown, NO bolding (**), NO headings (#). Use plain text and standard line breaks (\\n) only. 
4. Output MUST be valid JSON.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [{ role: 'system', content: systemMessage },
        { role: 'user', content: `Generate caption & content based on this description: "${description}"` }],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "caption_content",
            strict: true,
            schema: {
              type: "object",
              properties: {
                "caption": { type: "string" },
                "content": { type: "string", "description": "The main body of the user-generated content" }
              },
              required: ["caption", "content"]
            }
          }
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const fullResponse = response.data.choices?.[0]?.message?.content || "{}";
    const cleanedResponse = fullResponse.replace(/```json|```/g, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (error) {
      console.log(cleanedResponse);
      return res.status(500).json({ error: 'AI response was not valid JSON.' });
    }

    const caption = parsed.caption?.trim() || "";
    const postContent = parsed.content?.trim() || "";

    if (!caption || !postContent) {
      return res.status(500).json({ error: 'Missing caption or content in AI response.' });
    }

    return res.json({ caption, postContent });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'Failed to generate.' });
  }
});

export default router;
