import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../redux/redux';

function Logout() {

  const dispatch = useDispatch();


  const handleLogout = () => {
    Cookies.remove('access_token');
    dispatch(clearAuth());
  }

  return (
    <>
      <button id="logout-button" className="user-control-button" onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

export default Logout;