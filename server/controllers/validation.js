import users from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import activeSessionDb from '../models/activeSessions.js';

dotenv.config();

async function validateLogin(req, res) {
  try {
    const user = await users.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    
    const activeSession = await activeSessionDb.findOne({ username: user.username });

    if (activeSession) {
      return res
      .status(403)
      .send({
        accessToken,
        message: 'There is already an active session using your account',
      });
    }

    const newSession = {
      username: user.username,
      token: accessToken,
    };
    
    
    const loggedSession = await activeSessionDb.create(newSession);
    
    res.status(200).json({ accessToken, user });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

async function validateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

async function checkSeller(req, res, next) {
  try {
    const user = await users.findOne({ username: req.user.username });
    if (user.role.toLowerCase() === 'seller') {
      next();
    } else {
      res.status(403).send({ message: 'Forbidden' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

export default { validateLogin, validateToken, checkSeller };
