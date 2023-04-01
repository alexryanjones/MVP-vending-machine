import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Deposit from './Deposit';
import SellerControls from './SellerControls';
import userApi from '../../APIservices/userApiService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/redux';
import '../../styles/VendingWindowStyles.css';


function VendingControls () {
  const [depositClicked, setDepositClicked] = useState(false);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const handleDepositReset = async () => {
    try {
      const response = await userApi.resetDeposit(token, user);
      if (response.deposit === 0) {
        alert('Deposit reset to 0¢');
      }
      dispatch(setUser(response));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="vending-controls">
      <div id="user-info">
        <p id="greeting">Welcome, {user?.username || ''}!</p>
        {user && user.role.toLowerCase() === 'buyer' &&
          <div id="buyer-info">
            <p>You have {user.deposit}¢ remaining in your account.</p>
            {
            depositClicked ?
            <button id="cancel-deposit" onClick={() => setDepositClicked(false)}>Cancel</button> :
            <>
            <button id="add-deposit" onClick={() => setDepositClicked(true)}>Add Deposit</button>
            <button id="reset-deposit" onClick={() => handleDepositReset()}>Reset Deposit</button>
            </>
            }
            {depositClicked && <Deposit user={user}/>}
        </div>
      }
      </div>
      {user && user.role.toLowerCase() === 'seller' && <SellerControls />}
    </div>
  )
}

export default VendingControls;
