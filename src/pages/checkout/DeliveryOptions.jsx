import axios from "axios";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
export function DeliveryOptions({deliveryOption,cartItem,refreshCart}) {
  const selectDeliveryOption = async (deliveryOptionId) => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      deliveryOptionId,
    });
    await refreshCart();
  };

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOption.map((deliveryOption) => {
        let priceString = "FREE shipping";
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }
        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={() => selectDeliveryOption(deliveryOption.id)}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => selectDeliveryOption(deliveryOption.id)}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
