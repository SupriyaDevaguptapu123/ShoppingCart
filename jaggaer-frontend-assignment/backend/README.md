# Product API

## Getting Started

Follow the steps below to set up and run this backend locally.

---

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or above)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (comes with Node.js) or yarn as the package manager

---

## Installation

Install the dependencies:

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

---

## Running the Server

To start the server:

Using npm:
```bash
npm run start
```

Using yarn:
```bash
yarn start
```

---

## GraphQL Queries

### 1. Fetch a Single Product
```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    shortDescription
    longDescription
    price
    imageUrl
    rating
  }
}
```

### 2. Fetch All Products
```graphql
query GetProducts {
  products {
    id
    name
    shortDescription
    longDescription
    price
    imageUrl
    rating
  }
}
```

### 3. Fetch Cart Details
```graphql
query GetCart {
  cart {
    items {
      id
      productId
      product {
        id
        name
        price
      }
      quantity
    }
    count
    total
  }
}
```

### 4. Fetch Cart Count
```graphql
query GetCartCount {
  cartCount
}
```

---

## GraphQL Mutations

### 1. Add Item to Cart
```graphql
mutation AddToCart($productId: ID!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    id
    productId
    product {
      id
      name
      price
    }
    quantity
  }
}
```

### 2. Remove Item from Cart
```graphql
mutation RemoveFromCart($itemId: ID!) {
  removeFromCart(itemId: $itemId)
}
```

### 3. Clear the Cart
```graphql
mutation ClearCart {
  clearCart
}
```
