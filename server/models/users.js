import mongoose from '../db.js';

const usersSchema = mongoose.Schema({
  username: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  deposit: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export default mongoose.model('users', usersSchema);