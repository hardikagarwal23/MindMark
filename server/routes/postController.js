import express from 'express';
import entries from '../schema/eachEntry.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const afterId = req.query.afterId;

    let query = {};
    if (afterId) {
      query = { _id: { $lt: afterId } }; 
    }

    const posts = await entries.find(query)
      .sort({ _id: -1 })
      .limit(limit);

    const hasMore = posts.length === limit;

    res.json({ posts, hasMore });
  } catch (error) {
   res.status(500).json({ message: 'Failed to fetch posts', error });
  }
});



export default router;
