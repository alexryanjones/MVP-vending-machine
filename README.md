# MVP-vending-machine

Vending Machine API
This API provides endpoints for a vending machine application that allows users with a "seller" role to add, update, or remove products, while users with a "buyer" role can deposit coins into the machine and make purchases.

Getting Started
To get started with the API, clone this repository and run npm install to install the required dependencies. Then, start the API server by running npm start.

The API runs on http://localhost:4000 by default.

Endpoints
Authentication
POST /login
This endpoint allows a user to log in with their username and password.

Request Body
{
  "username": "string",
  "password": "string"
}

Response
If the login is successful, a JWT token is returned in the response body.
If the login fails, an error message is returned in the response body.

Users
GET /get-user-info
This endpoint allows a user to get their own user information.

Request Headers
Authorization: "Bearer [JWT token]"

Response
If the request is successful, the user's information is returned in the response body.
If the request fails, an error message is returned in the response body.
GET /get-users
This endpoint allows a user with a "seller" role to get a list of all users.

Request Headers
Authorization: "Bearer [JWT token]"
Response
If the request is successful, a list of all users is returned in the response body.
If the request fails, an error message is returned in the response body.
POST /add-user
This endpoint allows a user to create a new user account.

Request Body
{
  "username": "string",
  "password": "string",
  "role": "buyer" | "seller"
}

Response
If the request is successful, the new user account is returned in the response body.
If the request fails, an error message is returned in the response body.

PUT /update-user
This endpoint allows a user to update their own user information.

Request Headers
Authorization: "Bearer [JWT token]"

Request Body
{
  "username": "string",
  "password": "string",
  "deposit": number
}

Response
If the request is successful, the updated user information is returned in the response body.
If the request fails, an error message is returned in the response body.

DELETE /delete-user
This endpoint allows a user to delete their own user account.

Request Headers
Authorization: "Bearer [JWT token]"

Response
If the request is successful, a message confirming the deletion is returned in the response body.
If the request fails, an error message is returned in the response body.

DELETE /logout/all
This endpoint allows a user to terminate all active sessions on their account.

Request Headers
Authorization: "Bearer [JWT token]"

Response
If the request is successful, a message confirming the logout is returned in the response body.
If the request fails, an error message is returned in the response body.

Products
GET /get-products
This endpoint allows a user to get a list of all products.

Response
If the request is successful, a list of all products is returned in the response body.
If the request fails, an error message is returned in the response body.

POST /add-product
This endpoint allows a user with a "seller" role to add a new product to the vending machine.

Request Headers
Authorization: "Bearer [JWT token]"

Request Body
{
"name": "string",
"price": number,
"quantity": number
}

Response
If the request is successful, the new product is returned in the response body.
If the request fails, an error message is returned in the response body.

PUT /update-product
This endpoint allows a user with a "seller" role to update a product in the vending machine.

Request Headers
Authorization: "Bearer [JWT token]"

Request Body
{
"name": "string",
"price": number,
"quantity": number
}

Response
If the request is successful, the updated product information is returned in the response body.
If the request fails, an error message is returned in the response body.

DELETE /delete-product
This endpoint allows a user with a "seller" role to remove a product from the vending machine.

Request Headers
Authorization: "Bearer [JWT token]"

Request Body
{
"name": "string"
}

Response
If the request is successful, a message confirming the deletion is returned in the response body.
If the request fails, an error message is returned in the response body.

Accounts

POST /deposit
This endpoint allows a user with a "buyer" role to deposit coins into their account.

Request Headers
Authorization: "Bearer [JWT token]"

Request Body
{
"amount": number
}

Response
If the request is successful, the updated deposit balance is returned in the response body.
If the request fails, an error message is returned in the response body.

POST /reset-deposit
This endpoint allows a user with a "buyer" role to reset their deposit balance to zero.

Request Headers
Authorization: "Bearer [JWT token]"

Response
If the request is successful, a message confirming the reset is returned in the response body.
If the request fails, an error message is returned in the response body.

POST /buy-product
This endpoint allows a user with a "buyer" role to purchase a product from the vending machine.

Request Headers
Authorization: "Bearer [JWT token]"

Request Body
{
"product": "string"
}

Response
If the request is successful, the purchased product is returned in the response body.
If the request fails, an error message is returned in the response body.

Dependencies

express
crypto
bcrypt
jsonwebtoken
nodemon (dev)
dotenv (dev)








