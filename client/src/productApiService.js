const baseUrl = 'http://localhost:4000';

async function getProducts() {
  const response = await fetch(baseUrl + '/get-products');
  return response.json();
}

async function addProduct(token, product) {
  const response = await fetch(baseUrl + '/add-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return response.json();
}

async function updateProduct(token, productToUpdate, newProductDetails) {
  const body = {
    productName: productToUpdate,
    newProductName: newProductDetails.newProductName,
    newCost: newProductDetails.newCost,
    newAmountAvailable: newProductDetails.newAmountAvailable,
  };
  const response = await fetch(baseUrl + '/update-product', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

async function deleteProduct(token, productToDelete) {
  const response = await fetch(baseUrl + '/delete-product', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productName: productToDelete }),
  });
  return response.json();
}

async function buyProduct(token, productToBuy, amount) {
  const response = await fetch(baseUrl + '/buy-product', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productName: productToBuy, amount }),
  });
  return response.json();
}

const exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  buyProduct,
};

export default exports;