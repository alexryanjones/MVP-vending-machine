import Product from './Product';
import { useEffect, useState } from 'react';
import productApi from './productApiService';
import VendingControls from './VendingControls';

function VendingMachine () {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await productApi.getProducts();
    setProducts(response);
  }

  return (
    <div id="vending-machine">
      <div id="vending-window">
        {products.map((product) => {
            return (
              <Product key={product.id} product={product} />
            )
          }
        )}
      </div>
      <VendingControls />
    </div>
  )
}

export default VendingMachine;