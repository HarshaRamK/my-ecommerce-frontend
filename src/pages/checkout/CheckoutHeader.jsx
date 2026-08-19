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
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Logo" 
            />
            <img 
              className="mobile-logo" 
              src={`${import.meta.env.BASE_URL}images/mobile-logo.png`} 
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
            src={`${import.meta.env.BASE_URL}images/icons/checkout-lock-icon.png`} 
            alt="Checkout Lock" 
            style={{ width: "18px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}