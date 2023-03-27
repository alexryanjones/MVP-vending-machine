import express from 'express';
const router = express.Router();

router.get('/check', (req, res) => res.send('hello world'));

export default router;