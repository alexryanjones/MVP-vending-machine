import users from '../models/users.js';

async function getUsers(req, res) {
  try {
    const usersList = await users.find();
    res.status(200).send(usersList);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function addUser(req, res) {
  try {
    const { username, password, role } = req.body;
    const user = ({
      username,
      password,
      deopsit: 0,
      role
    });
    await users.create(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' });
  }
};

async function updateUser(req, res) {
  try {
    
    const userToUpdate = { username: req.headers.username };
    const { username, password, deposit, role } = req.body;
    const user = {};
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }
    if (deposit) {
      user.deposit = deposit;
    }
    if (role) {
      user.role = role;
    }

    console.log(userToUpdate);
    console.log(user);
    const updatedUser = await users.findOneAndUpdate(userToUpdate, user, { new: true });

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
  const username = req.headers.username;
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



export default { getUsers, addUser, updateUser, deleteUser };