import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";

// Prepend your live Render backend URL
const BACKEND_URL = "https://my-ecommerce-backend-ajxk.onrender.com";

export function PaymentSummary({ paymentSummary, loadcart }) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (isPlacingOrder) return;
    setIsPlacingOrder(true);
    try {
      // Point POST request to your live backend URL
      await axios.post(`${BACKEND_URL}/api/orders`);
      await loadcart();
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div>Items:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={placeOrder}
            disabled={isPlacingOrder || paymentSummary.totalItems === 0}
          >
            {isPlacingOrder ? 'Placing order...' : 'Place your order'}
          </button>
        </>
      )}
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { formatMoney } from "../../utils/money";
// export function PaymentSummary({paymentSummary, loadcart}) {
//   const [isPlacingOrder, setIsPlacingOrder] = useState(false);
//   const navigate = useNavigate();

//   const placeOrder = async () => {
//     if (isPlacingOrder) return;
//     setIsPlacingOrder(true);
//     try {
//       await axios.post("/api/orders");
//       await loadcart();
//       navigate("/orders");
//     } catch (error) {
//       console.error(error);
//       setIsPlacingOrder(false);
//     }
//   };

//   return (
//     <div className="payment-summary">
//       <div className="payment-summary-title">Payment Summary</div>

//       {paymentSummary && (
//         <>
//           <div className="payment-summary-row">
//             <div>Items:</div>
//             <div className="payment-summary-money">
//               {formatMoney(paymentSummary.productCostCents)}
//             </div>
//           </div>

//           <div className="payment-summary-row">
//             <div>Shipping &amp; handling:</div>
//             <div className="payment-summary-money">
//               {formatMoney(paymentSummary.shippingCostCents)}
//             </div>
//           </div>

//           <div className="payment-summary-row subtotal-row">
//             <div>Total before tax:</div>
//             <div className="payment-summary-money">
//               {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
//             </div>
//           </div>

//           <div className="payment-summary-row">
//             <div>Estimated tax (10%):</div>
//             <div className="payment-summary-money">
//               {formatMoney(paymentSummary.taxCents)}
//             </div>
//           </div>

//           <div className="payment-summary-row total-row">
//             <div>Order total:</div>
//             <div className="payment-summary-money">
//               {formatMoney(paymentSummary.totalCostCents)}
//             </div>
//           </div>

//           <button
//             className="place-order-button button-primary"
//             onClick={placeOrder}
//             disabled={isPlacingOrder || paymentSummary.totalItems === 0}
//           >
//             {isPlacingOrder ? 'Placing order...' : 'Place your order'}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
