import React from "react";
import "./Basket.css";
import Footer from "../Footer";
import { Button } from "../Button";

function Basket() {
    return (
        <>
        <section className="basket-section">
            <h1 className="basket-header">View basket</h1> 
            <div className="basket-items-wrapper">
                <ul className="basket-items-list">
                    <li className="basket-item">
                        <a href="">
                            <div className="item-image-wrapper">
                                <img src="/hoodie1.jpg" alt="Clothes img" className="item-image" />
                            </div>
                        </a>
                        <div className="basket-item-details">
                            <h2 className="item-header">
                                Name of product
                            </h2>
                            <span className="item-price">
                                88.99 PLN
                            </span>
                            <ul className="item-detail-list">
                                <li className="item-detail-el">
                                    <span className="item-detail-name">Prod. number:</span>
                                    <span className="item-detail-value">za331</span>
                                </li>
                                <li className="item-detail-el">
                                    <span className="item-detail-name">Size:</span>
                                    <span className="item-detail-value">M</span>
                                </li>
                                <li className="item-detail-el">
                                    <span className="item-detail-name">Color:</span>
                                    <span className="item-detail-value">Black</span>
                                </li>
                                <li className="item-detail-el">
                                    <span className="item-detail-name">Price:</span>
                                    <span className="item-detail-value">88.99 PLN</span>
                                </li>
                            </ul>
                            <div className="select-number-module">
                                <div className="select-container">
                                <select name="select-amount" id="select-amount">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                </ul>
                <div className="basket-sidebar">
                    <div className="basket-sidebar-header">
                    <h2 className="summary-header">
                        Summary
                    </h2>
                    </div>
                    <div className="summary-section">
                        <ul className="summary-section-list">
                            <li className="summary-section-el">
                                <span className="summary-section-el-name">Order price:</span>
                                <span className="summary-section-el-value">89.99 PLN</span>
                            </li>
                            <li className="summary-section-el">
                                <span className="summary-section-el-name">Delivery costs:</span>
                                <span className="summary-section-el-value">13.99 PLN</span>
                            </li>
                        </ul>
                        <div className="summary-section-summary-wrapper">
                            <span className="summary-section-el-name">Summary costs:</span>
                            <span className="summary-section-el-value">100.00 PLN</span>
                        </div>
                        <Button>
                            Finalize your order
                        </Button>
                    </div>
                </div>
            </div>

        </section>
        <Footer />
        </>
    );
}

export default Basket;