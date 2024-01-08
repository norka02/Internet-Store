import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import Footer from "../Footer";
import { ShopContext } from "./context/shop-context";
import axios from "axios";

function ProductDetail() {
  let { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart, cartItems } = useContext(ShopContext);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8000/api/products/${productId}/`
        );
        setProductDetails(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  // Wyświetlenie informacji o ładowaniu, gdy dane nie są jeszcze dostępne
  if (!productDetails) {
    return <div>Loading...</div>;
  }

  // Przekształcenie obiektu size_id w elementy do wyświetlenia
  const sizes = productDetails.size_id
    ? Object.entries(productDetails.size_id).map(([size, value]) => {
        if (value > 0 && size !== "size_id") {
          return (
            <button key={size} onClick={() => setSelectedSize(size)}>
              {size.toUpperCase().replace("SIZE_", "")}
            </button>
          );
        }
        return null;
      })
    : null;

  return (
    <>
      <div className="product-tile">
        <div className="product-wrapper">
          <h2 className="product-name">{productDetails.product_name}</h2>
          <p className="product-price">
            Cena Brutto: {productDetails.brutto_price}
          </p>
          <p className="product-color">Kolor: {productDetails.color}</p>
          <p className="product-description">{productDetails.description}</p>
          <div className="product-sizes">
            Dostępne rozmiary:
            {sizes}
          </div>
          {selectedSize && (
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(productDetails.product_id, selectedSize)}
            >
              Add to Cart
            </button>
          )}
          {cartItems.map((item, index) => (
            <div key={index}>
              Product ID: {item.productId}, Size ID: {item.sizeId}, Quantity:{" "}
              {item.quantity}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
