import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'File not uploaded' });
  }

  res.status(200).json({
    message: 'Upload successful!',
    url: req.file.path,
  });
});

export default router;


