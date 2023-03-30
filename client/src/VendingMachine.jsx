import Product from './Product';

function VendingMachine () {
  return (
    <div id="vending-machine">
      <div id="vending-window">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <div id="vending-controls">
        <p>Get your stuff here</p>
      </div>
    </div>
  )
}

export default VendingMachine;