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
  const [selectedColor, setSelectedColor] = useState(null);
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

  // Przekształcenie danych produktów w przyciski wyboru rozmiaru i koloru
  const sizes = productDetails.map((detail) => (
    <button key={detail.id} onClick={() => setSelectedSize(detail.size)}>
      {detail.size}
    </button>
  ));

  const colors = productDetails.map((detail) => (
    <button key={detail.id} onClick={() => setSelectedColor(detail.color)}>
      {detail.color}
    </button>
  ));

  return (
    <>
      <div className="product-tile">
        <div className="product-wrapper">
          <h2 className="product-name">{productDetails[0].product.name}</h2>
          <p className="product-price">
            Cena Brutto: {productDetails[0].product.price}
          </p>
          <div className="product-colors">
            Dostępne kolory:
            <div className="color-selection">{colors}</div>
          </div>
          <div className="product-sizes">
            Dostępne rozmiary:
            <div className="size-selection">{sizes}</div>
          </div>
          {selectedSize && selectedColor && (
            <button
              className="add-to-cart-button"
              onClick={() =>
                addToCart(
                  productDetails[0].product.id,
                  selectedSize,
                  selectedColor
                )
              }
            >
              Add to Cart
            </button>
          )}
          {cartItems.map((item, index) => (
            <div key={index}>
              Product ID: {item.productId}, Size: {item.size}, Color:{" "}
              {item.color}, Quantity: {item.quantity}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
