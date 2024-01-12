import React, { useContext, useState } from "react";
import "./PurchaseForm.css";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";
import { ShopContext } from "./sites/context/shop-context";
import axios from "axios";

function PurchaseForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [checkout, setCheckOut] = useState(false);
  const { cartItems } = useContext(ShopContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      firstName,
      lastName,
      city,
      street,
      houseNumber,
      zipCode,
      cartItems,
    };
    console.log(orderData);

    try {
      const resp = await axios.post(
        "http://localhost:8000/api/orders/",
        orderData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="container">
        <label htmlFor="first-name">First name:</label>
        <input
          type="text"
          value={firstName}
          name="first-name"
          placeholder="Enter first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="last-name">Last name:</label>
        <input
          type="text"
          value={lastName}
          name="last-name"
          placeholder="Enter last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          value={city}
          name="city"
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          value={street}
          name="street"
          placeholder="Enter street"
          onChange={(e) => setStreet(e.target.value)}
        />
        <label htmlFor="house-number">House number:</label>
        <input
          type="text"
          value={houseNumber}
          name="house-number"
          placeholder="Enter house number"
          onChange={(e) => setHouseNumber(e.target.value)}
        />
        <label htmlFor="zip-code">Zip code:</label>
        <input
          type="text"
          value={zipCode}
          name="zip-code"
          placeholder="Enter zip code"
          onChange={(e) => setZipCode(e.target.value)}
        />
        <label htmlFor="delivery-type">Delivery type:</label>
        <select name="delivery-type" id="">
          <option value="1">Kurier Inpost</option>
          <option value="2">Paczkomat</option>
          <option value="3">Kurier DPD</option>
        </select>
        {checkout ? (
          <Link to='/checkout'>Checkout</Link>
        ) : (
          <button type="submit"
            onClick={(e) => {
              setCheckOut(true);
            }}
          >
            Submit
          </button>
        )}
        {/* {checkout && <button type="submit">Submit</button>} */}
      </form>
    </>
  );
}

export default PurchaseForm;
