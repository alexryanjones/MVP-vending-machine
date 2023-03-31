import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Deposit from './Deposit';
import SellerControls from './SellerControls';

function VendingControls () {
  const [depositClicked, setDepositClicked] = useState(false);
  const user = useSelector(state => state.auth.user);

  return (
    <div id="vending-controls">
      <p>Welcome {user?.username || ''}</p>
      {user && user.role.toLowerCase() === 'buyer' &&
        <>
          <p>You have €{user.deposit} remaining in your account.</p>
          <button id="add-deposit" onClick={() => setDepositClicked(true)}>Add Deposit</button>
          {depositClicked && <Deposit user={user}/>}
        </>
      }
      {user && user.role.toLowerCase() === 'seller' && <SellerControls />}
      </div>
  )
}

export default VendingControls;
