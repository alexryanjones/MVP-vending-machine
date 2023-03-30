import Cookies from 'js-cookie';
import userApi from './userApiService';

function Deposit ({ user }) {

  const handleDeposit = async (amount) => {
    const response = await userApi.deposit(
      Cookies.get('access_token'),
      amount);
  }

  return (
    <div id="deposit">
      <button onClick={() => handleDeposit(5)}>5</button>
      <button onClick={() => handleDeposit(10)}>10</button>
      <button onClick={() => handleDeposit(20)}>20</button>
      <button onClick={() => handleDeposit(50)}>50</button>
      <button onClick={() => handleDeposit(100)}>100</button>
    </div>
  )
}

export default Deposit;