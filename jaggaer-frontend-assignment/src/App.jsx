import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Header from "./components/Header";

const App = () => {
  const [name, setName]= useState("Products")

  return(
  <Router>
    <Header name={name}/>
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/product/:id" element={<ProductDetails setName={setName}/>} />
      <Route path="/cart" element={<Cart setName={setName}/>} />
    </Routes>
  </Router>
);
}

export default App;
