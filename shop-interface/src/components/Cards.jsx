import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Cards.css";
import axios from "axios";

function Cards() {
  const [productsVariants, setProductsVariants] = useState([]);
  const baseUrl = "http://localhost:8000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products/`);
        console.log(response.data);
        setProductsVariants(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="cards">
        <h1>Check out products!</h1>
        <div className="cards-container">
          <div className="cards-wrapper">
            <ul className="cards-items">
              {productsVariants.map((productVariant) => (
                <ProductCard
                  path={`/products/${productVariant.id}`}
                  key={productVariant.id}
                  src={
                    productVariant.images.length > 0
                      ? baseUrl + productVariant.images[0].image
                      : ""
                  }
                  text={productVariant.product.name}
                  label={productVariant.product.category.name}
                  price={productVariant.product.price}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
