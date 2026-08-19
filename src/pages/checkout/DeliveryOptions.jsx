import axios from "axios";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";

// Prepend your live Render backend URL
const BACKEND_URL = "https://my-ecommerce-backend-ajxk.onrender.com";

export function DeliveryOptions({ deliveryOption = [], cartItem, refreshCart }) {
  const selectDeliveryOption = async (deliveryOptionId) => {
    try {
      await axios.put(`${BACKEND_URL}/api/cart-items/${cartItem.productId}`, {
        deliveryOptionId,
      });
      await refreshCart();
    } catch (error) {
      console.error("Failed to select delivery option:", error);
    }
  };

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {Array.isArray(deliveryOption) && deliveryOption.map((option) => {
        let priceString = "FREE shipping";
        if (option.priceCents > 0) {
          priceString = `${formatMoney(option.priceCents)} - Shipping`;
        }
        return (
          <div
            key={option.id}
            className="delivery-option"
            onClick={() => selectDeliveryOption(option.id)}
          >
            <input
              type="radio"
              checked={option.id === cartItem.deliveryOptionId}
              onChange={() => selectDeliveryOption(option.id)}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


// import axios from "axios";
// import { formatMoney } from "../../utils/money";
// import dayjs from "dayjs";
// export function DeliveryOptions({deliveryOption,cartItem,refreshCart}) {
//   const selectDeliveryOption = async (deliveryOptionId) => {
//     await axios.put(`/api/cart-items/${cartItem.productId}`, {
//       deliveryOptionId,
//     });
//     await refreshCart();
//   };

//   return (
//     <div className="delivery-options">
//       <div className="delivery-options-title">Choose a delivery option:</div>
//       {deliveryOption.map((deliveryOption) => {
//         let priceString = "FREE shipping";
//         if (deliveryOption.priceCents > 0) {
//           priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
//         }
//         return (
//           <div
//             key={deliveryOption.id}
//             className="delivery-option"
//             onClick={() => selectDeliveryOption(deliveryOption.id)}
//           >
//             <input
//               type="radio"
//               checked={deliveryOption.id === cartItem.deliveryOptionId}
//               onChange={() => selectDeliveryOption(deliveryOption.id)}
//               className="delivery-option-input"
//               name={`delivery-option-${cartItem.productId}`}
//             />
//             <div>
//               <div className="delivery-option-date">
//                 {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
//                   "dddd, MMMM D",
//                 )}
//               </div>
//               <div className="delivery-option-price">{priceString}</div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
