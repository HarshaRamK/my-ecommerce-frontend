import "./CheckoutPage.css";
import "./CheckoutHeader.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { PaymentSummary } from "./PaymentSummary";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { OrderSummary } from "./OrderSummary";

// Prepend your live Render backend URL
const BACKEND_URL = "https://my-ecommerce-backend-ajxk.onrender.com";

export function CheckoutPage({ cart, loadcart }) {
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const loadPaymentSummary = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/payment-summary`);
      setPaymentSummary(response.data);
    } catch (error) {
      console.error("Error loading payment summary:", error);
    }
  }, []);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/delivery-options?expand=estimatedDeliveryTime`
        );
        if (Array.isArray(response.data)) {
          setDeliveryOption(response.data);
        } else {
          setDeliveryOption([]);
        }
      } catch (error) {
        console.error("Error fetching delivery options:", error);
        setDeliveryOption([]);
      }

      await loadPaymentSummary();
    };
    fetchCheckoutData();
  }, [loadPaymentSummary]);

  // Whenever the cart changes (item added/removed/quantity changed),
  // refresh the payment summary so the totals stay accurate.
  const refreshCart = async () => {
    await loadcart();
    await loadPaymentSummary();
  };

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOption={deliveryOption}
            refreshCart={refreshCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadcart={loadcart} />
        </div>
      </div>
    </>
  );
}

// import "./CheckoutPage.css";
// import "./CheckoutHeader.css";
// import { CheckoutHeader } from "./CheckoutHeader";
// import { PaymentSummary } from "./PaymentSummary";
// import { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import { OrderSummary } from "./OrderSummary";
// export function CheckoutPage({ cart, loadcart }) {
//   const [deliveryOption, setDeliveryOption] = useState([]);
//   const [paymentSummary, setPaymentSummary] = useState(null);

//   const loadPaymentSummary = useCallback(async () => {
//     const response = await axios.get("/api/payment-summary");
//     setPaymentSummary(response.data);
//   }, []);

//   useEffect(() => {
//     const fetchCheckoutData = async () => {
//       let response = await axios.get(
//         "/api/delivery-options?expand=estimatedDeliveryTime",
//       );
//       setDeliveryOption(response.data);

//       await loadPaymentSummary();
//     };
//     fetchCheckoutData();
//   }, [loadPaymentSummary]);

//   // Whenever the cart changes (item added/removed/quantity changed),
//   // refresh the payment summary so the totals stay accurate.
//   const refreshCart = async () => {
//     await loadcart();
//     await loadPaymentSummary();
//   };

//   return (
//     <>
//       <title>Checkout</title>

//       <CheckoutHeader cart={cart} />

//       <div className="checkout-page">
//         <div className="page-title">Review your order</div>

//         <div className="checkout-grid">
//           <OrderSummary
//             cart={cart}
//             deliveryOption={deliveryOption}
//             refreshCart={refreshCart}
//           />

//           <PaymentSummary paymentSummary={paymentSummary} loadcart={loadcart} />
//         </div>
//       </div>
//     </>
//   );
// }
