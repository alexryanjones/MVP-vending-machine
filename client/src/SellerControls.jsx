import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import productApi from "./productApiService";
import SellerProduct from "./SellerProduct";

function SellerControls () {
  const token = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [addProductClicked, setAddProductClicked] = useState(false);

  const handleAddProduct = async (event) => {
    event.preventDefault();
    try {
      const product = {
        productName: productName,
        cost: price,
        amountAvailable: quantity,
        sellerId: user._id
      };
      const response = await productApi.addProduct(token, product);
      alert(`${response.amountAvailable} ${response.productName} added.`)
      setAddProductClicked(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await productApi.getProducts();
    const filteredProducts = response.filter(product => product.sellerId === user._id);
    setProducts(filteredProducts);
  }

  return (
    <div id="seller-controls-container">
      <h2>Your products</h2>
      <div id="seller-products">
        {products.map((product) => {
          return (
            <SellerProduct key={product._id} product={product} />
            )
          })}
      </div>
          {addProductClicked ?
            <form id="add-product" onSubmit={handleAddProduct}>
              <label>Product Name</label>
              <input type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
              <label>Price</label>
              <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              <label>Quantity</label>
              <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              <button type="submit">Add Product</button>
            </form> :
            <button onClick={() => setAddProductClicked(true)}>Add a New Product</button>
          } 
    </div>
  )
}

export default SellerControls;