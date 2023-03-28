const baseUrl = 'http://localhost:4000';

async function login(user) {
  const response = await fetch(baseUrl + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

async function getUsers() {
  console.log('oh hi');
  const response = await fetch(baseUrl + '/get-users');
  return response.json();
};

async function addUser(token, user) {
  const response = await fetch(baseUrl + '/add-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

async function updateUser(token, userToUpdate, newUserDetails) {
  const body = {
    username: userToUpdate,
    newUsername: newUserDetails.username,
    newPassword: newUserDetails.password,
    newDeposit: newUserDetails.deposit,
    newRole: newUserDetails.role,
  };
  const response = await fetch(baseUrl + '/update-user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

async function deleteUser(token, userToDelete) {
  const response = await fetch(baseUrl + '/delete-user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username: userToDelete }),
  });
  return response.json();
}

async function deposit(token, user, amount) {
  const response = await fetch(baseUrl + '/deposit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username: user, amount }),
  });
  return response.json();
}

async function resetDeposit(token, user) {
  const response = await fetch(baseUrl + '/reset-deposit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username: user }),
  });
  return response.json();
};

const exports = {
  login,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  deposit,
  resetDeposit,
};

export default exports;