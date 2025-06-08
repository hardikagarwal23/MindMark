import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('connected to db successfully!')
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

export default connectDB;

