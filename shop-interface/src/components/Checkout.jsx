import React, { useRef, useEffect } from "react";

export default function Checkout() {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                //TODO: connect with database?
                description: "Hoodie",
                amount: {
                  currency_code: "PLN",
                  value: 333.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {   
            // TODO: sending mail providing info that transaction gone succesfully
          const order = await actions.order.capture();
          console.log(order);
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