import users from '../models/users.js';
import activeSessionsDb from '../models/activeSessions.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

async function getUserInfo(req, res) {
  const username = req.user.username;
  try {
    const user = await users.find({username});
    res.send(user[0]);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}

async function getUsers(req, res) {
  try {
    const usersList = await users.find().select('username deposit role');
    res.status(200).send(usersList);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function addUser(req, res) {
  try {
    const { username, password, role } = req.body;
    const sellerId =
      role.toLowerCase() === 'seller' ? crypto.randomBytes(16).toString('hex') : undefined;
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      password: hashedPassword,
      deposit: 0,
      role,
      sellerId
    };
    
    await users.create(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};


async function updateUser(req, res) {
  try {
    const { newUsername, newPassword, newRole } = req.body;
    const username = req.user.username;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = {
      username: newUsername,
      password: hashedPassword,
      role: newRole,
    };

    const updatedUser = await users.findOneAndUpdate(username, user, { new: true });

    if (!updatedUser) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.status(200).send(updatedUser);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function deleteUser(req, res) {
  const username = req.user.username;
  try {
    const user = await users.findOneAndDelete({ username });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function deposit(req, res) {
  const { amount } = req.body;
  const username = req.user.username;
  const allowedDenominations = [5, 10, 20, 50, 100];
  try {
    const user = await users.findOne({ username });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else if (user.role.toLowerCase() !== 'buyer') {
      res.status(403).send({ message: 'You are not authorized to deposit coins' });
    } else if (!allowedDenominations.includes(amount)) {
      res.status(400).send({ message: 'Invalid coin denomination' });
    } else {
      user.deposit += amount;
      const newUserTotals = await users.findOneAndUpdate(
        { username },
        { $set: { deposit: user.deposit } },
        { new: true }
      );
      res.status(200).send(newUserTotals);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function resetDeposit(req, res) {
  const username = req.user.username;
  try {
    const user = await users.find({ username });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      const newUserTotals = await users.findOneAndUpdate({ username }, { $set: { deposit: 0 }}, { new: true });
      res.status(200).send(newUserTotals);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function logoutAll(req, res) {
  try {
    const user = req.user;
    const deletedSessions = await activeSessionsDb.deleteMany({
      username: user.username,
    });
    res
      .status(200)
      .send({
        message: `Successfully logged out of all sessions`,
      });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
}



export default {
  getUserInfo,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  deposit,
  resetDeposit,
  logoutAll
};