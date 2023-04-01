import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/redux";
import productApi from "../../APIservices/productApiService";
import SellerProduct from "./SellerProduct";
import '../../styles/VendingControlStyles.css';


function SellerControls () {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const products = useSelector(state => state.auth.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addProductClicked, setAddProductClicked] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleAddProduct = async () => {
  try {
    const product = {
      productName: productName,
      cost: price,
      amountAvailable: quantity,
      sellerId: user._id
    };
    const response = await productApi.addProduct(token, product);
    if (response.productName === productName) {
      const updatedProducts = JSON.parse(JSON.stringify([...products, response]));
      setAddProductClicked(false);
      alert(`${response.amountAvailable} ${response.productName} added.`)
      dispatch(setProducts(updatedProducts));
      
      const filteredProductsCopy = [...filteredProducts, response];
      setFilteredProducts(filteredProductsCopy);
      
    }
  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
    const filteredProducts = products.filter(product => product.sellerId === user._id);
    setFilteredProducts(filteredProducts);
  }, [products]);

  return (
  <div id="seller-controls-container">
    <h2>{addProductClicked ? 'Adding Product:' : 'Your products'}</h2>
    {addProductClicked ? (
      <form id="add-product" onSubmit={handleAddProduct}>
        <label>Product Name</label>
        <input type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <label>Price (¢)</label>
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <label>Quantity</label>
        <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <div id="add-product-buttons">
          <button type="submit">Add Product</button>
          <button onClick={() => setAddProductClicked(false)}>Cancel</button>
        </div>
      </form>
    ) : (
      <>
        <button onClick={() => setAddProductClicked(true)}>Add a New Product</button>
        <div id="seller-products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              return (
                <SellerProduct key={product.productName} product={product} />
              );
            })
          ) : (
            <p>You have no products yet.</p>
          )}
        </div>
      </>
    )}
  </div>
);

}

export default SellerControls;
