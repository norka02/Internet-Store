import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from "react-hot-toast";
import Payment from './sites/Payment'
import './Checkout.css'; 

const Checkout = () => {
  return (
    <PayPalScriptProvider> 
      {/* options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }} */}
      <div className="container">
        <Toaster position="top-center" />
        <Payment />
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;