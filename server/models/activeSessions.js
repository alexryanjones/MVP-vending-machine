import mongoose from '../db.js';

const activeSessionSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  });

export default mongoose.model('ActiveSession', activeSessionSchema);
