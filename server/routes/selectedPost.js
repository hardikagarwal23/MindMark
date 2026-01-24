import entries from "../schema/eachEntry.js";
import express from 'express';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await entries.findById(id);
    if (!post) {
      return res.status(404).json({message: "Post not found"});
    }
    res.status(200).json(post);
  }
  catch (error) {
    res.status(400).json({message: "Invalid ID format"});
  }
});

export default router;
