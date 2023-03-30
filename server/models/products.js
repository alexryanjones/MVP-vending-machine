import mongoose from '../db.js';

const productsSchema = mongoose.Schema({
  amountAvailable: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('products', productsSchema);