import products from '../models/products.js';

async function addProduct(req, res) {
  const { productName, cost, amountAvailable, sellerId } = req.body;
  const product = new products({
    productName,
    cost,
    amountAvailable,
    sellerId,
  });
  await product.save();
  res.send(product);
}

export default { addProduct };