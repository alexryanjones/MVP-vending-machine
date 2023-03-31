import Product from './Product';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from './redux';
import productApi from './productApiService';
import VendingControls from './VendingControls';

function VendingMachine() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.auth.products);
  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await productApi.getProducts();
    dispatch(setProducts(response));
  };

  return (
    <div id="vending-machine">
      <div id="vending-window">
        {products.length > 0 &&
          products.map(product => (
            <Product key={product._id} product={product} />
          ))}
      </div>
      <VendingControls />
    </div>
  );
}

export default VendingMachine;
