import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setUser, clearAuth } from './redux';
import userApi from './userApiService';

function UserControls() {
  const token = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [editClicked, setEditClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    if (!user) return;
    setUsername(user.username);
    setRole(user.role);
  }, [user]);

  const handleDeleteAccount = async () => {
    try {
      const deletedUser = await userApi.deleteUser(token);
      if (deletedUser.username === user.username) {
        alert('User deleted successfully!');
        Cookies.remove('access_token');
        dispatch(clearAuth());
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditAccount = async (event) => {
    event.preventDefault();
    try {
      const newUserInfo = {
        username,
        password,
        role,
      };
      const updatedUser = await userApi.updateUser(token, newUserInfo);
      dispatch(setUser(updatedUser));
      alert('User updated successfully!');
      setEditClicked(false);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  }

  return (
    <div className="user-controls">
      <button onClick={() => setEditClicked(true)}>Edit Account Details</button>
      <button onClick={() => handleDeleteAccount()}>Delete Account</button>
      {editClicked && (
        <div className="edit-form">
          <h2>Edit Account Details</h2>
          <form onSubmit={handleEditAccount}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="role">Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditClicked(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserControls;
