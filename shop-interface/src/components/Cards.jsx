import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Cards.css";
import axios from "axios";

function Cards() {
  const [products, setProducts] = useState([]);
  const baseUrl = "http://localhost:8000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products/`);
        console.log(response.data);
        setProducts(response.data);
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
              {products.map((product) => (
                <ProductCard
                  path={`/products/${product.id}`}
                  key={product.id}
                  src={
                    product.images.length > 0
                      ? baseUrl + product.images[0].image
                      : ""
                  }
                  text={product.name}
                  label={product.category.name}
                  price={product.price}
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
