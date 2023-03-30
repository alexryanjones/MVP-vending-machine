import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Deposit from './Deposit';

function VendingControls () {
  const [depositClicked, setDepositClicked] = useState(false);
  const user = useSelector(state => state.auth.user);

  return (
    <div id="vending-controls">
      <p>Get your stuff here</p>
      {user &&
      <>
        <p>Welcome {user.username}</p>
        <p>You have €{user.deposit} remaining in your account.</p>
        <button id="add-deposit" onClick={() => setDepositClicked(true)}>Add Deposit</button>
        {depositClicked && <Deposit user={user}/>}
        </>
      }
      </div>
  )
}

export default VendingControls;
