import { useState } from 'react';
import userApi from './userApiService'


function Login({ setLoggedIn, setToken }) {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Buyer',
  });

  const handleLogin = async () => {
    if (isNewUser && formValues.password !== formValues.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const user = {
      username: formValues.username,
      password: formValues.password,
    };
    try {
      const response = await userApi.login(user);
      console.log(response);
      switch (response.message) {
        case 'User not found':
          alert('User not found');
          break;
        case 'Invalid password':
          alert('Invalid password');
          break;
        default:
          if (typeof response === 'object' && response.accessToken) {
            setLoggedIn(true);
            setToken(response.accessToken);
          }
          break;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('User not found');
      } else if (error.response && error.response.status === 401) {
        alert('Incorrect password');
      }
    }
  }

  const handleSignUp = async () => {
    if (isNewUser && formValues.password !== formValues.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const user = {
      username: formValues.username,
      password: formValues.password,
      role: formValues.role,
    };
    try {
      const response = await userApi.addUser(user);
      switch (response.message) {
        case 'Username already exists':
          alert('Username already exists');
          break;
        default:
          if (typeof response === 'object' && response.accessToken) {
            setLoggedIn(true);
            setToken(response.accessToken);
          }
          break;
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Username already exists');
      }
    }
  }


  const handleUsernameChange = (event) => {
    setFormValues({ ...formValues, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setFormValues({ ...formValues, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setFormValues({ ...formValues, confirmPassword: event.target.value });
  };

  const handleRoleChange = (event) => {
    setFormValues({ ...formValues, role: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    isNewUser ? await handleSignUp() : await handleLogin();
  };



  const handleNewUserClick = () => {
    setIsNewUser(!isNewUser);
  };

  return (
    <>
      <div id="login-screen">
        <div id="login-container">
          <h1>{isNewUser ? 'Create Account' : 'Login'}</h1>
          <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={formValues.username} onChange={handleUsernameChange} />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={formValues.password} onChange={handlePasswordChange} />

            {isNewUser && (
              <>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" value={formValues.confirmPassword} onChange={handleConfirmPasswordChange} />

                <label htmlFor="role">Role:</label>
                <select id="role" value={formValues.role} onChange={handleRoleChange}>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                </select>

              </>
            )}

            <button type="submit">{isNewUser ? 'Create Account' : 'Login'}</button>
            {isNewUser ? 
              <button type="button" onClick={handleNewUserClick}>Already Have an Account? Login Here</button> :
              <button type="button" onClick={handleNewUserClick}>New Here? Create an Account</button>
            }
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;