import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Cards.css";
import axios from "axios";

function Cards() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products.map((product) => product.product));

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
                  src=""
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
