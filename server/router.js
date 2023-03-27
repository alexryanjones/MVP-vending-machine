import express from 'express';
import products from './controllers/products.js';
import users from './controllers/users.js';
const router = express.Router();

router.get('/check', (req, res) => res.send('hello world'));

// users
router.get('/get-users', users.getUsers);
router.post('/add-user', users.addUser);
router.put('/update-user', users.updateUser);
router.delete('/delete-user', users.deleteUser);

router.post('/add-product', products.addProduct);

export default router;