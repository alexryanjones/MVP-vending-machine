import express from 'express';
import products from './controllers/products.js';
import users from './controllers/users.js';
import validation from './controllers/validation.js';
const router = express.Router();

router.get('/check', (req, res) => res.send('hello world'));

// login
router.post('/login', validation.validateLogin);

// users
router.get('/get-user-info', validation.validateToken, users.getUserInfo);
router.get('/get-users', users.getUsers);
router.post('/add-user', users.addUser);
router.put('/update-user', validation.validateToken, users.updateUser);
router.delete('/delete-user', validation.validateToken, users.deleteUser);
router.delete('/logout/all', validation.validateToken, users.logoutAll);

// products
router.get('/get-products', products.getProducts);
router.post('/add-product', validation.validateToken, validation.checkSeller, products.addProduct);
router.put('/update-product', validation.validateToken, validation.checkSeller, products.updateProduct);
router.delete('/delete-product', validation.validateToken, validation.checkSeller, products.deleteProduct);

// accounts
router.post('/deposit', validation.validateToken, users.deposit);
router.post('/reset-deposit', validation.validateToken, users.resetDeposit);
router.post('/buy-product', validation.validateToken, products.buyProduct);



export default router;

// add readme, change thing, sellerId from accesstoken, buyers cant upload product (should work when updating the sellerId) change buy-product http method (find rest principles)