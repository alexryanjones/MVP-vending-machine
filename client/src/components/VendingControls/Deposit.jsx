import userApi from '../../APIservices/userApiService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/redux';
import EuroIcon from '../../assets/1-euro.png';
import FiftyCentIcon from '../../assets/50-cent.png';
import TwentyCentIcon from '../../assets/20-cent.png';
import TenCentIcon from '../../assets/10-cent.png';
import FiveCentIcon from '../../assets/5-cent.png';
import '../../styles/VendingControlStyles.css';


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
      <img id="five-cent" className="coin-image" src={FiveCentIcon} onClick={() => handleDeposit(5)} alt="five-cent-coin"/>
      <img id="ten-cent" className="coin-image" src={TenCentIcon} onClick={() => handleDeposit(10)} alt="ten-cent-coin"/>
      <img id="twenty-cent" className="coin-image" src={TwentyCentIcon} onClick={() => handleDeposit(20)} alt="twenty-cent-coin"/>
      <img id="fifty-cent" className="coin-image" src={FiftyCentIcon} onClick={() => handleDeposit(50)} alt="fifty-cent-coin"/>
      <img id="one-euro" className="coin-image" src={EuroIcon} onClick={() => handleDeposit(100)} alt="one-euro-coin"/>
    </div>
  )
}

export default Deposit;