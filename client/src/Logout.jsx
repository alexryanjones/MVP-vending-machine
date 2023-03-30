import Cookies from 'js-cookie';

function Logout({ setLoggedIn, setToken }) {

  const handleLogout = () => {
    Cookies.remove('access_token');
    setToken(null);
    setLoggedIn(false);

  }

  return (
    <>
      <button id="logout-button" onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

export default Logout;