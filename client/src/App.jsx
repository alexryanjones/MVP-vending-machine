import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/AccountControls/Login';
import Logout from './components/AccountControls/Logout';
import UserControls from './components/AccountControls/UserControls';
import VendingMachine from './VendingMachine';
import Cookies from 'js-cookie';
import { setUser, setAccessToken } from './redux/redux';
import userApi from './APIservices/userApiService';

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
  }, []);

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
