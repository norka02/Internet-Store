import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Cards.css";
import axios from "axios";

function Cards() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [sortOrder, filterCategory]);

  const filterAndSortProducts = () => {
    let updatedProducts = [...products];

    // Filtrowanie
    if (filterCategory) {
      updatedProducts = updatedProducts.filter(
        (product) => product.product.category.name === filterCategory
      );
    }

    // Sortowanie
    switch (sortOrder) {
      case "price_asc":
        updatedProducts.sort(
          (a, b) => parseFloat(a.product.price) - parseFloat(b.product.price)
        );
        break;
      case "price_desc":
        updatedProducts.sort(
          (a, b) => parseFloat(b.product.price) - parseFloat(a.product.price)
        );
        break;
      case "name_asc":
        updatedProducts.sort((a, b) =>
          a.product.name.localeCompare(b.product.name)
        );
        break;
      case "name_desc":
        updatedProducts.sort((a, b) =>
          b.product.name.localeCompare(a.product.name)
        );
        break;
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
  };

  return (
    <>
      <div className="filter-sort-container">
        <div className="filter-container">
          <label htmlFor="filter-category">Filtruj według kategorii:</label>
          <select
            id="filter-category"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Wszystkie</option>
            <option value="Unisex">Unisex</option>
            <option value="Męskie">Męskie</option>
            // Dodaj więcej kategorii zgodnie z danymi z API
          </select>
        </div>

        <div className="sort-container">
          <label htmlFor="sort-order">Sortuj według:</label>
          <select
            id="sort-order"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Domyślnie</option>
            <option value="price_asc">Cena: od najniższej</option>
            <option value="price_desc">Cena: od najwyższej</option>
            <option value="name_asc">Nazwa: A-Z</option>
            <option value="name_desc">Nazwa: Z-A</option>
          </select>
        </div>
      </div>

      <div className="cards">
        <h1>Check out products!</h1>
        <div className="cards-container">
          <div className="cards-wrapper">
            <ul className="cards-items">
              {filteredProducts.map((productVariant) => (
                <ProductCard
                  path={`/products/${productVariant.id}`}
                  key={productVariant.id}
                  src={
                    productVariant.images.length > 0
                      ? `http://localhost:8000${productVariant.images[0].image}`
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
