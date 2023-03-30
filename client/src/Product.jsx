function Product ({product}) {
  return (
    <div className="product">
      <p>{product.productName}</p>
      <p>Price: €{product.cost}</p>
      <p>Remaining: {product.amountAvailable}</p>
      <button onClick = {() => {}}>Buy</button>
    </div>
  )
}

export default Product;