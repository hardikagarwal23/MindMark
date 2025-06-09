import entries from "../schema/eachEntry.js";
import express from 'express';
    
const router = express.Router();
    
    router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const post = await entries.findById(id);
  if (!post) return res.send({ message: "Post not found" });
  res.send(post);
});

export default router;