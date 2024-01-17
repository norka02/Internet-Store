import React, { useRef, useEffect, useContext } from "react";
import { ShopContext } from "./context/shop-context";
// import './Checkout.css'
import toast from 'react-hot-toast';
import { PayPalButtons } from "@paypal/react-paypal-js";


const Payment = () => {
    const {getTotalCartAmount, cardItems} = useContext(ShopContext);

  return (
      <div className="card">
          <div className="card-details">
              <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                      return actions.order.create({
                          purchase_units: [
                              {
                                  amount: {
                                      value: getTotalCartAmount()
                                  },
                                  // custom_id: ""  // the name or slug of the thing you're selling
                              },
                          ],
                      });
                  }}
                  onApprove={(data, actions) => {
                      return actions.order.capture().then(function (details) {
                          toast.success('Payment completed. Thank you, ' + details.payer.name.given_name)
                      });
                  }}
                  onCancel={() => toast(
                      "You cancelled the payment. Try again by clicking the PayPal button", {
                      duration: 6000,
                  })}
                  onError={(err) => {
                      toast.error(
                          "There was an error processing your payment. If this error please contact support.", {
                          duration: 6000,
                      });
                  }}
              />
          </div>
      </div>
  )
};

export default Payment;


// export default function Checkout() {
//   const paypal = useRef();

//   const {getTotalCartAmount, cardItems} = useContext(ShopContext);

//   useEffect(() => {
//     console.log(cardItems)
//     window.paypal
//       .Buttons({
//         createOrder: (data, actions, err) => {
//           return actions.order.create({
//             intent: "CAPTURE",
//             purchase_units: [
//               {
//                 //TODO: connect with database?
//                 description: cardItems,
//                 amount: {
//                   currency_code: "PLN",
//                   value: getTotalCartAmount(),
//                 },
//               },
//             ],
//           });
//         },
//         onApprove: async (data, actions) => {   
//             // TODO: sending mail providing info that transaction gone succesfully 
//           const order = await actions.order.capture();
//           console.log(order);
//           alert("Payment successful")
//         },
//         onError: (err) => {
//           console.log(err);
//           alert("Payment Error")
//         },
//       })
//       .render(paypal.current);
//   }, []);

//   return (
//     <div className="checkout-container">
//       <div className="checkout-container-2" ref={paypal}></div>
//     </div>
//   );
// }