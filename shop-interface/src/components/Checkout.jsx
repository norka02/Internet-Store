import React, { useRef, useEffect, useContext } from "react";
import { ShopContext } from "./sites/context/shop-context";

export default function Checkout() {
  const paypal = useRef();

  const {getTotalCartAmount, cardItems} = useContext(ShopContext);

  useEffect(() => {
    console.log(cardItems)
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                //TODO: connect with database?
                description: cardItems,
                amount: {
                  currency_code: "PLN",
                  value: getTotalCartAmount(),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {   
            // TODO: sending mail providing info that transaction gone succesfully 
          const order = await actions.order.capture();
          console.log(order);
          alert("Payment successful")
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}