# eComm

An e-commerce application built to deliver a seamless online shopping experience, with a modern stack and fully functional features for browsing, purchasing, and managing products.

Live preview: https://techworld.onrender.com

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure registration and login with JWT.
- **Product Catalog**: Browse and search for products by category, name, or price.
- **Shopping Cart**: Add, update, or remove products from the cart.
- **Checkout System**: Seamless checkout process with order confirmation.
- **Admin Dashboard**: Manage products, categories, and view orders.

## Tech Stack

- **Frontend**: React, Redux, CSS (add any UI libraries if applicable)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (or your database choice)
- **Authentication**: JWT for secure user authentication
- **Payment**: (so far only PayPal is implemented)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/makranan/eComm.git
   cd eComm
   ```

2. **Install dependencies**

   #### Backend

   ```bash
   npm install
   ```

   #### Frontend

   ```bash
   cd frontend
   npm install
   ```

3. #### Environment Variables

   Change file name from `example.env` to `.env` in the **root** directory and add your configurations.

4. #### Run the Application

   ##### To run development server with frontend client

   ```bash
   # From root app directory

   npm run dev
   ```

5. #### Usage

   Frontend: Go to http://localhost:3000 to access the frontend.

   Backend: The backend runs on http://localhost:5000 by default.

6. #### Contributing

   Contributions are welcome! Please fork the repository and open a pull request with your changes.

7. #### License

   This project is licensed under the MIT License.
