import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import Footer from "../Footer";
import { ShopContext } from "./context/shop-context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Slider from "react-slick";

function ProductDetail() {
  let { productId } = useParams();
  const [productVariant, setProductVariant] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const { addToCart, cartItems } = useContext(ShopContext);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}/`
        );
        setProductVariant(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (!productVariant) {
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSizeSelection = (sizeId) => {
    setSelectedSizeId(sizeId);
  };

  const sizes = productVariant.product.sizes.map((size) => (
    <button key={size.id} onClick={() => handleSizeSelection(size.id)}>
      {size.name}
    </button>
  ));

  return (
    <>
      <div className="item-wrap">
        <div className="wrap-container">
          <div className="product-header">
            <h2 className="product-name">{productVariant.product.name}</h2>
            <p className="product-price">
              Cena Brutto: {productVariant.product.price}
            </p>
          </div>
          <div className="main-content">
            <div className="product-wrapper">
              <Slider {...sliderSettings} className="slider">
                {productVariant.images.map((image, index) => (
                  <div key={index}>
                    <img
                      className="image-wrap slider"
                      src={`http://localhost:8000${image.image}`}
                      alt="Product"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="item-info-wrapper">
              <div className="item-info-container">
                <div className="product-colors">
                  Kolor: {productVariant.color}
                </div>
                <div className="product-sizes">
                  Dostępne rozmiary:
                  <div className="size-selection">{sizes}</div>
                </div>
                {selectedSizeId && (
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(productVariant.id, selectedSizeId)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              {cartItems.map((item, index) => (
                <div key={index}>
                  Product Variant ID: {item.productVariantId}, Size ID:{" "}
                  {item.sizeId}, Quantity: {item.quantity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
