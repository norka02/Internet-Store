import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "./sites/context/shop-context";
import "./PurchaseForm.css";

const PurchaseForm = () => {
  const [customerData, setCustomerData, checkout] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    houseNumber: "",
    apartmentNumber: "",
    city: "",
    postalCode: "",
    province: "",
  });
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customer: customerData,
      items: cartItems,
      totalAmount: getTotalCartAmount(),
    };
    console.log(orderData);
    axios
      .post("http://localhost:8000/api/orders/", orderData)
      .then((response) => {
        console.log(response.data);
        checkout();
      })
      .catch((error) => {
        console.error("Error sending order", error);
        // Obsługa błędów
      });
  };


  return (
    <form onSubmit={handleSubmit} className="purchase-form">
      <h2 className="purchase-form-title">Formularz zakupu</h2>
      <div className="purchase-form-container">
        <label className="purchase-form-label">
          Imię:
          <input
            className="purchase-form-input"
            type="text"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
          />
        </label>
        <label className="purchase-form-label">
          Nazwisko:
          <input
          className="purchase-form-input"
            type="text"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="purchase-form-container">
        <label className="purchase-form-label">
          Numer telefonu:
          <input
            className="purchase-form-input"
            type="tel"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
          />
        </label>
        <label className="purchase-form-label">
          Email:
          <input
            className="purchase-form-input"
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="purchase-form-container">
        <label className="purchase-form-label">
          Województwo:
          <input
            className="purchase-form-input"
            type="text"
            name="province"
            value={customerData.province}
            onChange={handleChange}
          />
        </label>
        <label className="purchase-form-label">
          Miasto:
          <input
            className="purchase-form-input"
            type="text"
            name="city"
            value={customerData.city}
            onChange={handleChange}
          />
        </label>
        <label className="purchase-form-label">
          Kod pocztowy:
          <input
            className="purchase-form-input"
            type="text"
            name="postalCode"
            value={customerData.postalCode}
            onChange={handleChange}
          />
        </label>
        <label className="purchase-form-label">
          Ulica:
          <input
            className="purchase-form-input"
            type="text"
            name="street"
            value={customerData.street}
            onChange={handleChange}
          />
        </label>
        <label className="purchase-form-label">
          Numer domu:
          <input
            className="purchase-form-input"
            type="text"
            name="houseNumber"
            value={customerData.houseNumber}
            onChange={handleChange}
          />
        </label>
        <label className="purchase-form-label">
          Numer mieszkania:
          <input
            className="purchase-form-input"
            type="text"
            name="apartmentNumber"
            value={customerData.apartmentNumber}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="purchase-form-container">
        <p>Całkowita cena zamówienia: {getTotalCartAmount()} PLN</p>
      </div>
      <Link to="/checkout">
        <button className="purchase-form-button" type="submit">Złóż zamówienie</button>
      </Link>
    </form>
  );
};

export default PurchaseForm;
