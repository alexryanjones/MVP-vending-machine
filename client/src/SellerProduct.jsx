import { useSelector } from 'react-redux';
import { useState } from 'react';
import productApi from './productApiService';

function SellerProduct ({product}) {
  const token = useSelector(state => state.auth.accessToken);
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
      console.log(newProductInfo);
      const response = await productApi.updateProduct(token, product.productName, newProductInfo);
      setEditClicked(false)
      alert(`${response.productName} updated.`);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await productApi.deleteProduct(token, product.productName);
      alert(`${response.productName} deleted.`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h3>{product.productName}</h3>
      <p>Price: ${product.cost}</p>
      <p>Quantity: {product.amountAvailable}</p>
      <button onClick={() => setEditClicked(true)}>Edit</button>
      <button onClick={() => handleDelete()}>Delete</button>
      {editClicked && 
        <form id="edit-product" onSubmit={handleEdit}>
          <label>Product Name</label>
          <input type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <label>Price</label>
          <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <label>Quantity</label>
          <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <button type="submit">Update Product</button>
        </form>
      }

    </>
  )
}

export default SellerProduct;