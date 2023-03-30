import './App.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import Logout from './Logout';
import VendingMachine from './VendingMachine';
import Cookies from 'js-cookie';
import { setUser, setAccessToken } from './redux';
import userApi from './userApiService';

function App() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector(state => state.user);

  const getUserInfo = async (token) => {
    const user = await userApi.getUserInfo(token);
    dispatch(setUser(user));
  }

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      dispatch(setAccessToken(token));
      getUserInfo(token);
      setLoggedIn(true);
    }
  }, [dispatch, user]);



  return (
    <div className="app">
      {!loggedIn ?
      <Login setLoggedIn={setLoggedIn}/> : 
      <Logout setLoggedIn={setLoggedIn}/>
      }
      <VendingMachine user={user}/>
    </div>
  );
}

export default App;
