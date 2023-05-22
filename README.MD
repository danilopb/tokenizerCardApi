# Tokenizer Cards API

This is an API for managing Tokenizer cards.

## Prerequisites

Make sure you have Node.js and npm installed on your machine.

- Node.js (v18.0.0 or higher)
- MongoDB (v4.4 o superior)

## Installation

1. Clone this repository to your local machine:

   git clone https://github.com/your-username/tokenizercardsapi.git

2. Navigate to the project directory:

cd tokenizercardsapi

3. Install the project dependencies:

npm install

## Configuration

Before running the application, make sure to configure the necessary environment variables. Follow these steps:

Create a .env file in the root directory of the project.

Inside .env, define the required environment variables according to your needs. Here's an example or you can check the file .env.example in root directory:
```
PORT=3011

SERVER_PORT=3011

DB_CONNECTION=mongodb

DB_HOST=127.0.0.1

DB_PORT=27017

DB_DATABASE=mydatabase

CARD_TOKEN_MINUTES_TO_EXPIRED=15

USER=dperalta

PASSWORD=123456

API_TOKEN=pk_test_Yj4ns0OTLNm9XI7z
```
## Usage

To start the API server, run the following command in the project directory:
```
npm run dev
```
The API server will start listening on the specified port (e.g., 3011). You can now make requests to the API using tools like cURL, Postman, or your preferred HTTP client.

## Endpoints Disponibles

1. Get authorization token

### URL
```
POST /login
```

### Parámetros
username (string): El nombre de usuario del usuario que desea iniciar sesión.
password (string): La contraseña del usuario que desea iniciar sesión.

### Example of request
```
POST /login

Content-Type: multipart/form-data

username=johndoe&password=secretpassword
```

### Example of a successful response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "pk_test_Yj4ns0OTLNm9XI7z",
}
```

The response body contains an authentication token that will be used to make authenticated requests to other API endpoints.

### Example of error response
```
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "Las credenciales no son correctas"
}
```

2. Obtain card information by token

This endpoint allows obtaining information from a card by means of its token.

### URL
```
GET /find/:token

Route parameters

token (string): The token of the card.

Headers

Authorization (string): The authentication token.
```

### Example of request
```
GET /find/abc123xyz

Authorization: pk_test_Yj4ns0OTLNm9XI7z
```

### Example of a successful response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "cardNumber": "1235 5675 7895 1234",
  "cvv": "123",
  "expirationMonth": "12",
  "expirationYear": "2024",
  "email": "john.doe@example.com"
}
```

2. Generar un token para una tarjeta

This endpoint allows to generate a token for a card with the data provided.

### URL
```
POST /generate-token
```

### Headers

Authorization (string): The authentication token.

### Parameters in the body

- card_number (number): The card number.

- cvv (numer): The security code of the card.

- expiration_month (string): The expiration month of the card.

- expiration_year (string): The card expiration year.

- email (string): The email associated with the card.

### Example of request
```
POST /generate-token

Authorization: pk_test_Yj4ns0OTLNm9XI7z

card_number=1234567812345678&cvv=123&expiration_month=12&expiration_year=2024&email=john.doe@gmail.com
```

### Example of a successful response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "abc123xyz"
}
```
