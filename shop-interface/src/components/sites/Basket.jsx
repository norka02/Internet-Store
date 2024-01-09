import React, { useContext } from "react";
import "./Basket.css";
import Footer from "../Footer";
import { Button } from "../Button";
import { ShopContext } from "./context/shop-context";
import { Link } from "react-router-dom";

function Basket() {
  const { cartItems, products, updateCartItemCount, getTotalCartAmount } =
    useContext(ShopContext);

  const handleQuantityChange = (productId, sizeId, newQuantity) => {
    updateCartItemCount(productId, sizeId, parseInt(newQuantity));
  };
  const deliveryCost = 13.99;
  return (
    <>
      <section className="basket-section">
        <h1 className="basket-header">View basket</h1>
        <div className="basket-items-wrapper">
          <ul className="basket-items-list">
            {cartItems.map((cartItems, index) => {
              const product = products.find(
                (p) => p.product_id === cartItems.productId
              );
              if (!product) return null;

              return (
                <li key={index} className="basket-item">
                  <a href="">
                    <div className="item-image-wrapper">
                      <img
                        src="/hoodie1.jpg"
                        alt="Clothes img"
                        className="item-image"
                      />
                    </div>
                  </a>
                  <div className="basket-item-details">
                    <h2 className="item-header">{product.product_name}</h2>
                    <span className="item-price">
                      {product.brutto_price} PLN
                    </span>
                    <ul className="item-detail-list">
                      <li className="item-detail-el">
                        <span className="item-detail-name">Prod. number:</span>
                        <span className="item-detail-value">
                          {product.product_id}
                        </span>
                      </li>
                      <li className="item-detail-el">
                        <span className="item-detail-name">Size:</span>
                        <span className="item-detail-value">
                          {cartItems.sizeId}
                        </span>
                      </li>
                      <li className="item-detail-el">
                        <span className="item-detail-name">Color:</span>
                        <span className="item-detail-value">
                          {product.color}
                        </span>
                      </li>
                      <li className="item-detail-el">
                        <span className="item-detail-name">Sum:</span>
                        <span className="item-detail-value">
                          {cartItems.quantity * product.brutto_price}
                          PLN
                        </span>
                      </li>
                    </ul>
                    <div className="select-number-module">
                      <div className="select-container">
                        <select
                          name="select-amount"
                          value={cartItems.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              cartItems.productId,
                              cartItems.sizeId,
                              e.target.value
                            )
                          }
                          id="select-amount"
                        >
                          {[...Array(10).keys()].map((num) => (
                            <option key={num} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="basket-sidebar">
            <div className="basket-sidebar-header">
              <h2 className="summary-header">Summary</h2>
            </div>
            <div className="summary-section">
              <ul className="summary-section-list">
                <li className="summary-section-el">
                  <span className="summary-section-el-name">Order price:</span>
                  <span className="summary-section-el-value">
                    {getTotalCartAmount()} PLN
                  </span>
                </li>
                <li className="summary-section-el">
                  <span className="summary-section-el-name">
                    Delivery costs:
                  </span>
                  <span className="summary-section-el-value">
                    {deliveryCost} PLN
                  </span>
                </li>
              </ul>
              <div className="summary-section-summary-wrapper">
                <span className="summary-section-el-name">Summary costs:</span>
                <span className="summary-section-el-value">
                  {deliveryCost + getTotalCartAmount()
                    ? getTotalCartAmount()
                    : 0}
                  {" PLN"}
                </span>
              </div>
              <Link to="/purchase-form">
                <button className="finalize-button">FINALIZE YOUR ORDER</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Basket;
