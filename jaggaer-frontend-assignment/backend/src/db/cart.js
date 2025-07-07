import { v4 as uuidv4 } from 'uuid';
import { productService } from './products.js';

let cartItems = [];

export const cartService = {
  getCart() {
    return {
      items: cartItems,
      count: this.getCartCount(),
      total: this.getCartTotal()
    };
  },

  getCartCount() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getCartTotal() {
    return cartItems.reduce((total, item) => {
      const product = productService.getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  addToCart(productId, quantity = 1) {
    const product = productService.getProductById(productId);

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const existingCartItem = cartItems.find(item => item.productId === productId);

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      return existingCartItem;
    } else {
      const newCartItem = {
        id: uuidv4(),
        productId,
        quantity
      };

      cartItems.push(newCartItem);
      return newCartItem;
    }
  },

  removeFromCart(itemId) {
    const initialLength = cartItems.length;
    cartItems = cartItems.filter(item => item.id !== itemId);
    return cartItems.length !== initialLength;
  },

  clearCart() {
    cartItems = [];
    return true;
  }
};