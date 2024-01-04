import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import Footer from "../Footer";
import { Button } from "../Button";

function ProductDetail() {
  let { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

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
    console.log(productDetails);

    fetchProductDetail();
  }, [productId]);

  if (!productDetails) {
    return <div>Loading...</div>; // Wyświetlenie informacji o ładowaniu, gdy dane nie są jeszcze dostępne
  }

  // Przekształcenie obiektu size_id w elementy do wyświetlenia
  const sizes = productDetails.size_id
    ? Object.entries(productDetails.size_id).map(([size, value]) => {
        if (value > 0 && size !== "size_id") {
          return (
            <span key={size}>{size.toUpperCase().replace("SIZE_", "")} </span>
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
        </div>
        <div className="product-wrapper">
          <Button>Add to basket</Button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
