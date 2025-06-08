import express from 'express';
import entries from '../schema/eachEntry.js';  

const router = express.Router();

router.post('/', async (req, res) => {

    if (!req.body) {
        return res.status(456).json({ error: 'No data in request body' });
      }
  const { email, topic ,uploadUrl, caption, postContent } = req.body;
  try {
    const newEntry = new entries({
      email,
      date:new Date().toISOString(),
       topic,
      uploadUrl,
      caption,
      postContent
    });

    // Save the entry to the database
    const savedEntry = await newEntry.save();

    // Send a response with the saved entry
    res.status(201).json(savedEntry);
  } catch (err) {
    // Handle errors (e.g., validation errors, database connection errors)
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const allEntries = await entries.find().sort({ createdAt: -1 });
    res.status(200).json(allEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;

