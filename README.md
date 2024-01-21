# EncryptionDecryptionTask
This project provides a simple Node.js server using Express to demonstrate basic encryption and decryption operations . It includes two endpoints: one for encrypting a message and  another for decrypting it.

# Task
Setup a backend web server that has two key functions:
- A function that takes in a plaintext message, and encrypts it using a secret key. The secret key should be the same as a user's wallet (e.g. EVM address).
  
- A function that takes in an encrypted message from function #1, and decrypts it using the user's public key (e.g. EVM address).
  
- For each function write corresponding tests.

# Prerequisites
Before you begin, ensure you have the following installed:

- Node.js

- npm (Node Package Manager)

# Installation
- To set up the project on your local machine, follow these steps:

1. Clone the repository:
 `git clone [URL of the GitHub repo]`

2. Navigate to the project directory:
  `cd backend`

3. Install the dependencies:
  `npm install`

# Running the Server
- To start the Express server, run the following command in the root directory of the project:
  `npm start`
NB: The server will start on http://localhost:3000 by default. You can change the port in the server configuration if necessary.


# Endpoints
- The server exposes two POST endpoints:

1. /encrypt:
-  Encrypts a message i.e a plain text message

 Payload example: ` { "message": "Hello, World!" }` ,

-  this returns a response object with the following 
  
  `{
  "evmAddress": "0xdCdD20723e25953A596154Ab71105e1845219Bde",
  "encryptedMessage": "a3fa5a37f92daca65a1a9ee8e3d33668:fc9b5dfa8f58b26a2bfef5345551503b"
}`

2. /decrypt

- Decrypts a message using a provided evmAddress and encryptedMessage returned as response from encrypt endpoint.


Payload example: `{ "evmAddress": "0xdCdD20723e25953A596154Ab71105e1845219Bde", "encryptedMessage": "a3fa5a37f92daca65a1a9ee8e3d33668:fc9b5dfa8f58b26a2bfef5345551503b]" }`

# Running Tests
- To run the test suite, use the following command:
 `npm test`


