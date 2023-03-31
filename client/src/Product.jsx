import { useSelector, useDispatch } from 'react-redux';
import productApi from './productApiService';
import { setUser, setProducts } from './redux';

function Product ({product}) {

  const token = useSelector(state => state.auth.accessToken);
  const products = useSelector(state => state.auth.products);
  const dispatch = useDispatch();

  const handleBuyClick = async () => {
    try {
      const response = await productApi.buyProduct(token, product.productName);
      if (response.updatedUser) {
        dispatch(setUser(response.updatedUser));
        const updatedProduct = response.updatedProduct;
        const updatedProducts = products.map(p => {
          if (p.productName === updatedProduct.productName) {
            return updatedProduct;
          }
          return p;
        });
        dispatch(setProducts(updatedProducts));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="product">
      <h3>{product.productName}</h3>
      <p>Remaining: {product.amountAvailable}</p>
      <button onClick = {() => handleBuyClick()}>{product.cost}¢</button>
    </div>
  )
}

export default Product;