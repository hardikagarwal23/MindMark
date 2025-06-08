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

  const prompt = `
Generate a less than one-line catchy caption and a long detailed post based on this description: "${description}".  
Use a warm tone for emotional stories, or a formal tone for news/informational content.  
Keep the language clear and easy to understand.
Return ONLY a JSON format with two keys:  
{
  "caption": "...",  
  "content": "..."   
}
Do not include any other extra character and mark.
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.3-8b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const fullResponse = response.data.choices?.[0]?.message?.content || "{}";

    let parsed;
    try {
      parsed = JSON.parse(fullResponse);
    } catch {
      return res.status(500).json({ error: 'AI response was not valid JSON.' });
    }

    const caption = parsed.caption?.trim() || "";
    const postContent = parsed.content?.trim() || "";

    if (!caption || !postContent) {
      return res.status(500).json({ error: 'Missing caption or content in AI response.' });
    }

    return res.json({ caption, postContent });
  } catch (error) {
    console.error("Error:", error.error.message);
    return res.status(500).json({ error: 'Failed to generate.' });
  }
});

export default router;



