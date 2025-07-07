export const products = [
  {
    id: '1',
    name: 'Smartphone',
    shortDescription: 'High-end smartphone with great camera',
    longDescription: 'Meet the smartphone that redefines connectivity. With its advanced camera, powerful processor, and vibrant display, it seamlessly bridges work and leisure. Stay connected with cutting-edge 5G technology and enjoy a sleek design that fits perfectly in your hand.',
    price: 699.99,
    imageUrl: 'http://127.0.0.1:3000/assets/smartphone.jpg',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Laptop',
    shortDescription: 'Powerful laptop for work and gaming',
    longDescription: 'Experience unparalleled performance and portability with this state-of-the-art laptop. Whether you\'re a professional, student, or creative, this device is engineered to meet your demands. Enjoy ultra-fast processing, stunning graphics, and a lightweight design that lets you work and play wherever life takes you.',
    price: 1299.99,
    imageUrl: 'http://127.0.0.1:3000/assets/laptop.jpg',
    rating: 4
  },
  {
    id: '3',
    name: 'Headphones',
    shortDescription: 'Noise-cancelling wireless headphones',
    longDescription: 'Dive into a world of immersive sound with these premium headphones. Whether it’s music, calls, or gaming, they deliver crystal-clear audio and noise cancellation. Designed for comfort and durability, they are your perfect companion for long listening sessions.',
    price: 199.99,
    imageUrl: 'http://127.0.0.1:3000/assets/headphones.jpg',
    rating: 3
  },
  {
    id: '4',
    name: 'Watch',
    shortDescription: 'A stylish and feature-packed timepiece that combines functionality with elegance.',
    longDescription: 'Elevate your daily routine with this multi-functional smartwatch. Designed to complement your lifestyle, it offers fitness tracking, notifications, and customizable watch faces. Crafted with precision and style, it’s the perfect blend of technology and timeless design.',
    price: 249.99,
    imageUrl: 'http://127.0.0.1:3000/assets/watch.jpg',
    rating: 2.5
  }
];

export const productService = {
  getProducts() {
    return products;
  },

  getProductById(id) {
    return products.find(product => product.id === id);
  }
};