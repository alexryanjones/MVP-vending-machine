import mongoose from '../db.js';

const usersSchema = mongoose.Schema({
  username: {
    type: String,
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
  sellerId: {
    type: String,
    required: function () {
      return this.role === 'seller';
    },
    validate: {
      validator: function (v) {
        if (this.role === 'seller') {
          return v && v.length > 0;
        }
        return true;
      },
      message: 'SellerId is required for sellers',
    },
  },
});


export default mongoose.model('users', usersSchema);