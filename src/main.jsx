import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import Product from "./pages/product/Product.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductDetail from "./pages/product/ProductDetail.jsx";

import RootLayout from "./components/layouts/root-layout.jsx";
import Register from "./pages/auth/Register.jsx";
import Register2 from "./pages/auth/Register2.jsx";
import CreateProduct from "./pages/product/CreateProduct.jsx";
import DeleteProduct from "./pages/product/DeleteProduct.jsx";
import LoginAuth from "./pages/auth/LoginAuth.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/delete-product" element={<DeleteProduct />} />
            
          </Route>
          <Route path="/login" element={<LoginAuth />} />

          <Route path="/register" element={<Register2 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
