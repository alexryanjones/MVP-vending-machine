import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Logout from './Logout';
import VendingMachine from './VendingMachine';
import Cookies from 'js-cookie';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(Cookies.get('access_token'));

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      Cookies.set('access_token', token);
    }
  }, [token]);

  const handleClick = async () => {
    console.log(token);
  }

  return (
    <div className="app">
      {!loggedIn ?
      <Login setLoggedIn={setLoggedIn} setToken={setToken}/> : 
      <Logout setLoggedIn={setLoggedIn} setToken={setToken}/>
      }
      <VendingMachine />
      <button onClick={() => handleClick()}>Click Me</button>
    </div>
  );
}

export default App;
