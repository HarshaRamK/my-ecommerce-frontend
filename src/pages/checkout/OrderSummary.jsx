
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";
export function OrderSummary({cart,deliveryOption,refreshCart}) {
  if (deliveryOption.length > 0 && cart.length === 0) {
    return (
      <div className="order-summary">
        <div className="empty-cart-message">Your cart is empty.</div>
      </div>
    );
  }

  return (
    <div className="order-summary">
      {deliveryOption.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOption.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          return (
            <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <div className="cart-item-details-grid">


              <CartItemDetails cartItem={cartItem} refreshCart={refreshCart}/>

                <DeliveryOptions cartItem={cartItem} deliveryOption={deliveryOption} refreshCart={refreshCart}/>
              </div>
            </div>
          );
        })}
    </div>
  );
}
