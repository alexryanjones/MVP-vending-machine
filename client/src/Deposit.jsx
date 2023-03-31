import userApi from './userApiService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux';

function Deposit () {

  const token = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const handleDeposit = async (amount) => {
    try {
      const updatedUser = await userApi.deposit(token, amount);
      dispatch(setUser(updatedUser));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="deposit">
      <button onClick={() => handleDeposit(5)}>5¢</button>
      <button onClick={() => handleDeposit(10)}>10¢</button>
      <button onClick={() => handleDeposit(20)}>20¢</button>
      <button onClick={() => handleDeposit(50)}>50¢</button>
      <button onClick={() => handleDeposit(100)}>100¢</button>
    </div>
  )
}

export default Deposit;