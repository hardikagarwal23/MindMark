import mongoose from 'mongoose';

const entriesSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: String, required: true },
  topic: { type: Array, required: true },
  uploadUrl: { type: String, required: true },
  caption: { type: String, required: true },
  postContent: { type: String, required: true }
}, { timestamps: true });

const entries = mongoose.model('Entries', entriesSchema, 'entries');

export default entries;
