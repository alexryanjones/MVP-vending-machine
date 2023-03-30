import users from '../models/users.js';
import bcrypt from 'bcrypt';

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      password: hashedPassword,
      deposit: 0,
      role,
    };
    console.log(user);
    await users.create(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function updateUser(req, res) {
  try {
    const { newUsername, newPassword, newDeposit, newRole } = req.body;
    const username = req.user.username;
    const user = {};
    if (newUsername) {
      user.username = newUsername;
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }
    if (newDeposit) {
      user.deposit = newDeposit;
    }
    if (newRole) {
      user.role = newRole;
    }

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
    console.log(error.message);
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function deposit(req, res) {
  const { amount } = req.body;
  const username = req.user.username;
  console.log(username, amount);
  const allowedDenominations = [5, 10, 20, 50, 100];
  try {
    const user = await users.findOne({ username });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else if (user.role !== 'buyer') {
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


export default {
  getUserInfo,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  deposit,
  resetDeposit,
};