import express from 'express';
import entries from '../schema/eachEntry.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    const totalCount = await entries.countDocuments();
    const posts = await entries.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const hasMore = skip + posts.length < totalCount;

    res.json({ posts, hasMore });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
});


export default router;
