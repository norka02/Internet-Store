import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return [];
};

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const addToCart = (productVariantId, sizeId) => {
    const existingItem = cartItems.find(
      (item) =>
        item.productVariantId === productVariantId && item.sizeId === sizeId
    );

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productVariantId === productVariantId && item.sizeId === sizeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        { productVariantId, sizeId, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (productVariantId, sizeId) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productVariantId === productVariantId && item.sizeId === sizeId
          )
      )
    );
  };

  const updateCartItemCount = (productVariantId, sizeId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productVariantId === productVariantId && item.sizeId === sizeId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      const productVariant = products.find(
        (p) => p.id === item.productVariantId
      );
      if (productVariant) {
        totalAmount += item.quantity * parseFloat(productVariant.product.price);
      }
    }
    return totalAmount;
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
