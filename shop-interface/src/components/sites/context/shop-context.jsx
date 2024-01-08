import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

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

  const addToCart = (productId, sizeId) => {
    const existingItem = cartItems.find(
      (item) => item.productId === productId && item.sizeId === sizeId
    );

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId && item.sizeId === sizeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { productId, sizeId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, sizeId) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.sizeId === sizeId)
      )
    );
  };

  const updateCartItemCount = (productId, sizeId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.sizeId === sizeId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      const product = products.find((p) => p.product_id === item.productId);
      if (product) {
        totalAmount += item.quantity * parseFloat(product.brutto_price);
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
  console.log(cartItems);
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
