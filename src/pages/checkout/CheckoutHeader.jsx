import { Link } from "react-router";

export function CheckoutHeader({ cart = [] }) {
  const itemCount = cart.reduce((sum, cartItem) => sum + (cartItem.quantity || 0), 0);

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img 
              className="logo" 
              src="/images/logo.png" 
              alt="Logo" 
            />
            <img 
              className="mobile-logo" 
              src="/images/mobile-logo.png" 
              alt="Logo" 
            />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img 
            src="/images/icons/checkout-lock-icon.png" 
            alt="Checkout Lock" 
          />
        </div>
      </div>
    </div>
  );
}