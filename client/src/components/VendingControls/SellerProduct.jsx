import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setProducts } from '../../redux/redux';
import productApi from '../../APIservices/productApiService';
import '../../styles/VendingControlStyles.css';

function SellerProduct ({product}) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.accessToken);
  const products = useSelector(state => state.auth.products);
  const [editClicked, setEditClicked] = useState(false);
  const [productName, setProductName] = useState(product.productName);
  const [price, setPrice] = useState(product.cost);
  const [quantity, setQuantity] = useState(product.amountAvailable);

  const handleEdit = async () => {
    try {
      const newProductInfo = {
        newProductName: productName,
        newCost: price,
        newAmountAvailable: quantity
      };
      const response = await productApi.updateProduct(token, product.productName, newProductInfo);
      setEditClicked(false)
      alert(`${response.productName} updated.`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await productApi.deleteProduct(token, product.productName);
      if (response.deletedProduct.productName === product.productName) {
        const deletedProduct = response.deletedProduct;
        const updatedProducts = products.filter(p => p.productName !== deletedProduct.productName);
        dispatch(setProducts(updatedProducts));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='seller-product'>
      <h3>{product.productName}</h3>
      <div className='seller-product-headings'>
        <p>Price: {product.cost}¢</p>
        <p>Quantity: {product.amountAvailable}</p>
      </div>
      {editClicked ? (
        <form id="edit-product" onSubmit={handleEdit}>
          <div class="form-group">
            <label for="productName">Product Name</label>
            <input type="text" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <button type="submit">Update Product</button>
          <button onClick={() => setEditClicked(false)}>Cancel</button>
        </form>
      ) : (
        <div className='seller-product-buttons'>
          <button onClick={() => setEditClicked(true)}>Edit</button>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default SellerProduct;
