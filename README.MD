# Tokenizer Cards API

This is an API for managing Tokenizer cards.

## Prerequisites

Make sure you have Node.js and npm installed on your machine.

- Node.js (v18.0.0 or higher)

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

## Usage

To start the API server, run the following command in the project directory:

npm start

The API server will start listening on the specified port (e.g., 3011). You can now make requests to the API using tools like cURL, Postman, or your preferred HTTP client.
