import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import Logout from './Logout';
import UserControls from './UserControls';
import VendingMachine from './VendingMachine';
import Cookies from 'js-cookie';
import { setUser, setAccessToken } from './redux';
import userApi from './userApiService';

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const loggedIn = Boolean(accessToken);

  const getUserInfo = async (token) => {
    const user = await userApi.getUserInfo(token);
    dispatch(setUser(user));
  }

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      dispatch(setAccessToken(token));
      getUserInfo(token);
    }
  }, [dispatch]);

  return (
    <div className="app">
      {!loggedIn ?
        <Login /> : 
        <>
          <div id="controls">
            <Logout />
            <UserControls />
          </div>
          <VendingMachine />
        </>
      }
    </div>
  );
}

export default App;
