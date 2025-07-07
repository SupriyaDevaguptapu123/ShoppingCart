import { productService } from './db/products.js';
import { cartService } from './db/cart.js';

export const resolvers = {
  Query: {
    product: (_, { id }) => productService.getProductById(id),
    products: () => productService.getProducts(),
    cart: () => cartService.getCart(),
    cartCount: () => cartService.getCartCount()
  },

  Mutation: {
    addToCart: (_, { productId, quantity }) => {
      return cartService.addToCart(productId, quantity);
    },

    removeFromCart: (_, { itemId }) => {
      return cartService.removeFromCart(itemId);
    },

    clearCart: () => {
      return cartService.clearCart();
    }
  },

  CartItem: {
    product: (cartItem) => productService.getProductById(cartItem.productId)
  }
};