import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/sites/Home";
import Products from "./components/sites/Products";
import About from "./components/sites/About";
import Basket from "./components/sites/Basket";
import Contact from "./components/sites/Contact";
import Footer from "./components/Footer";
import PurchaseForm from "./components/PurchaseForm";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/sites/ProductDetail";
import { ShopContextProvider } from "./components/sites/context/shop-context";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/sites/UserProfile";
import CustAccForm from "./components/CustAccForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/products" Component={Products} />
            <Route
              path="/products/:productId"
              Component={ProductDetail}
            ></Route>
            <Route path="/contact" Component={Contact} />
            <Route path="/basket" Component={Basket} />
            <Route path="/purchase-form" Component={PurchaseForm} />
            <Route path="/checkout" Component={Checkout} />
            <Route path="/register-form" Component={RegisterForm} />
            <Route path="/sign-in" Component={LoginForm} />
            <Route path="/user-profile" Component={UserProfile} />
            <Route path="/update-customer-info" Component={CustAccForm} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </>
  );
}

export default App;
