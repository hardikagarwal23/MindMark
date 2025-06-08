import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

const Users = mongoose.model('Users', userSchema, 'users');

export default Users;
