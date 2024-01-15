import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "./sites/context/shop-context";

const PurchaseForm = () => {
  const [customerData, setCustomerData] = useState({
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
        // Obsługa po pomyślnym wysłaniu danych (np. wyświetlenie komunikatu, wyczyszczenie koszyka)
      })
      .catch((error) => {
        console.error("Error sending order", error);
        // Obsługa błędów
      });
  };

  const [checkout, setCheckOut] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formularz zakupu</h2>
      <div>
        <label>
          Imię:
          <input
            type="text"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Nazwisko:
          <input
            type="text"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Numer telefonu:
          <input
            type="tel"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Województwo:
          <input
            type="text"
            name="province"
            value={customerData.province}
            onChange={handleChange}
          />
        </label>
        <label>
          Miasto:
          <input
            type="text"
            name="city"
            value={customerData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Kod pocztowy:
          <input
            type="text"
            name="postalCode"
            value={customerData.postalCode}
            onChange={handleChange}
          />
        </label>
        <label>
          Ulica:
          <input
            type="text"
            name="street"
            value={customerData.street}
            onChange={handleChange}
          />
        </label>
        <label>
          Numer domu:
          <input
            type="text"
            name="houseNumber"
            value={customerData.houseNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Numer mieszkania:
          <input
            type="text"
            name="apartmentNumber"
            value={customerData.apartmentNumber}
            onChange={handleChange}
          />
        </label>
      </div>
      {/* ... (pozostałe pola adresu) */}
      <div>
        <p>Całkowita cena zamówienia: {getTotalCartAmount()} PLN</p>
      </div>
      {/* <button type="submit">Złóż zamówienie</button> */}
      {checkout ? (
        <Link to='/checkout'>Checkout</Link>
      ) : (
        <button type="submit"
          onClick={(e) => {
            setCheckOut(true);
          }}
        >
          Złóż zamówienie
        </button>
      )}
      {/* {checkout && <button type="submit">Submit</button>} */}
    </form>
  );
};

export default PurchaseForm;
