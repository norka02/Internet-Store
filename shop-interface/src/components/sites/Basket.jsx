import React, { useContext } from "react";
import "./Basket.css";
import Footer from "../Footer";
import { Button } from "../Button";
import { ShopContext } from "./context/shop-context";
import { Link } from "react-router-dom";

function Basket() {
  const {
    cartItems,
    products,
    updateCartItemCount,
    getTotalCartAmount,
    removeFromCart,
  } = useContext(ShopContext);

  const handleQuantityChange = (productVariantId, sizeId, newQuantity) => {
    updateCartItemCount(productVariantId, sizeId, parseInt(newQuantity));
  };
  const deliveryCost = 13.99;

  return (
    <>
      <section className="basket-section">
        <h1 className="basket-header">View basket</h1>
        <div className="basket-items-wrapper">
          <ul className="basket-items-list">
            {cartItems.map((item, index) => {
              const productVariant = products.find(
                (p) => p.id === item.productVariantId
              );
              if (!productVariant) return null;

              const selectedSize = productVariant.product.sizes.find(
                (s) => s.id === item.sizeId
              );
              if (!selectedSize) return null;

              return (
                <li key={index} className="basket-item">
                  <div className="item-image-wrapper">
                    <img
                      src={`http://localhost:8000${productVariant.images[0].image}`}
                      alt={productVariant.product.name}
                      className="item-image"
                    />
                  </div>
                  <div className="basket-item-details">
                    <h2 className="item-header">
                      {productVariant.product.name} - {productVariant.color}
                    </h2>
                    <span className="item-price">
                      {productVariant.product.price} PLN
                    </span>
                    <ul className="item-detail-list">
                      <li className="item-detail-el">
                        <span className="item-detail-name">Size:</span>
                        <span className="item-detail-value">
                          {selectedSize.name}
                        </span>
                      </li>
                      <li className="item-detail-el">
                        <span className="item-detail-name">Sum:</span>
                        <span className="item-detail-value">
                          {item.quantity *
                            parseFloat(productVariant.product.price)}{" "}
                          PLN
                        </span>
                      </li>
                    </ul>
                    <div className="select-number-module">
                      <div className="select-container">
                        <select
                          name="select-amount"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.productVariantId,
                              item.sizeId,
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
                        <button
                          onClick={() =>
                            removeFromCart(item.productVariantId, item.sizeId)
                          }
                          className="remove-from-cart-button"
                        >
                          Remove
                        </button>
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
