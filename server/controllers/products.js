import products from '../models/products.js';
import users from '../models/users.js';

async function getProducts(req, res) {
  try {
    const productsList = await products.find();
    res.status(200).send(productsList);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

async function addProduct(req, res) {
  try {
    const { productName, cost, amountAvailable, sellerId } = req.body;
    const existingProduct = await products.findOne({ productName });
    if (existingProduct) {
      return res.status(400).send({ message: 'Product already exists' });
    }

    const product = {
      productName,
      cost,
      amountAvailable,
      sellerId,
    };

    await products.create(product);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

async function updateProduct(req, res) {
  try {
    const { productName, newProductName, newCost, newAmountAvailable } =
      req.body;
    const product = {
      productName: newProductName,
      cost: newCost,
      amountAvailable: newAmountAvailable,
    };

    const updatedProduct = await products.findOneAndUpdate(
      { productName, sellerId: req.user.id },
      product,
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).send({ message: 'Product not found' });
    } else {
      res.status(200).send(updatedProduct);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

async function deleteProduct(req, res) {
  try {
    const productName = req.body.productName;
    const sellerId = req.user.id;
    const sellerUsername = req.user.username;
    const deletedProduct = await products.findOneAndDelete({
      productName,
      sellerId,
    });

    if (!deletedProduct) {
      res.status(404).send({ message: 'Product not found' });
    } else {
      res.status(200).send({ deletedProduct });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

async function buyProduct(req, res) {
  try {
    const username = req.user.username;
    const user = await users.findOne({ username });
    if (user.role.toLowerCase() !== 'buyer') {
      res
        .status(403)
        .send({ message: 'You are not authorized to buy products' });
    } else {
      const { productName } = req.body;
      const purchasedProduct = await products.findOne({ productName });
      if (!purchasedProduct) {
        res.status(404).send({ message: 'Product not found' });
      } else {
        if (user.deposit < purchasedProduct.cost) {
          res.status(400).send({ message: 'Not enough money in your deposit' });
        } else {
          purchasedProduct.amountAvailable--;
          const updatedProduct = await products.findOneAndUpdate(
            { productName },
            purchasedProduct,
            { new: true }
          );
          user.deposit -= purchasedProduct.cost;
          const updatedUser = await users.findOneAndUpdate(
            { username: user.username },
            user,
            { new: true }
          );
          res.status(200).send({ updatedProduct, updatedUser });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  buyProduct,
};
