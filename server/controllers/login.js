import users from '../models/users.js';
import bcrypt from 'bcrypt';

async function validateLogin(req, res) {
  try {
    const user = await users.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      res.status(401).send({ message: 'Invalid password' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

export default { validateLogin };