export const schema = `
  type Product {
    id: ID!
    name: String!
    shortDescription: String!
    longDescription: String!
    price: Float!
    imageUrl: String
    rating: Float!
  }

  type CartItem {
    id: ID!
    productId: ID!
    product: Product
    quantity: Int!
  }

  type Cart {
    items: [CartItem!]!
    count: Int!
    total: Float!
  }

  type Query {
    product(id: ID!): Product
    products: [Product!]!
    cart: Cart!
    cartCount: Int!
  }

  type Mutation {
    addToCart(productId: ID!, quantity: Int!): CartItem!
    removeFromCart(itemId: ID!): Boolean!
    clearCart: Boolean!
  }
`;