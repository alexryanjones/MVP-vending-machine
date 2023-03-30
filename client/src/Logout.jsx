import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { clearAuth } from './redux';

function Logout({ setLoggedIn }) {

  const dispatch = useDispatch();


  const handleLogout = () => {
    Cookies.remove('access_token');
    setLoggedIn(false);
    dispatch(clearAuth())
  }

  return (
    <>
      <button id="logout-button" onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

export default Logout;