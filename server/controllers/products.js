import products from '../models/products.js';

async function getProducts(req, res) {
  try {
    const productsList = await products.find();
    res.status(200).send(productsList);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function addProduct(req, res) {
  try {
    const { productName, cost, amountAvailable, sellerId } = req.body;
    const product = ({
      productName,
      cost,
      amountAvailable,
      sellerId,
    });
    await products.create(product);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function updateProduct(req, res) {
  try {
    const { productName, newProductName, newCost, newAmountAvailable, newSellerId } = req.body;
    const product = {};
    if (newProductName) {
      product.productName = newProductName;
    }
    if (newCost) {
      product.cost = newCost;
    }
    if (newAmountAvailable) {
      product.amountAvailable = newAmountAvailable;
    }
    if (newSellerId) {
      product.sellerId = newSellerId;
    }
    const updatedProduct = await products.findOneAndUpdate(productName, product, { new: true });

    if (!updatedProduct) {
      res.status(404).send({ message: 'Product not found' });
    } else {
      res.status(200).send(updatedProduct);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function deleteProduct(req, res) {
  try {
    const productToDelete = { productName: req.body.productname };
    const deletedProduct = await products.findOneAndDelete(productToDelete);
    if (!deletedProduct) {
      res.status(404).send({ message: 'Product not found' });
    } else {
      res.status(200).send(deletedProduct);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};


export default { getProducts, addProduct, updateProduct, deleteProduct };