import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import MyOrder from "./screens/MyOrder";
import SharedLayOut from "./components/SharedLayOut";
import { CartProvider } from "./components/ContextReducer";

const App = () => {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayOut />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/myorders" element={<MyOrder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
};

export default App;
