import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { clearAuth } from './redux';

function Logout() {

  const dispatch = useDispatch();


  const handleLogout = () => {
    Cookies.remove('access_token');
    dispatch(clearAuth());
  }

  return (
    <>
      <button id="logout-button" onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

export default Logout;