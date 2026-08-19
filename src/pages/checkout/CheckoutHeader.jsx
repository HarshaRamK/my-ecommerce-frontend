import { Link } from "react-router";

// 1. Import images stored inside src/assets/images/
import logoImage from "../../assets/images/logo.png";
import mobileLogoImage from "../../assets/images/mobile-logo.png";

export function CheckoutHeader({ cart = [] }) {
  const itemCount = cart.reduce((sum, cartItem) => sum + (cartItem.quantity || 0), 0);

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            {/* 2. Use the imported variable for src/assets files */}
            <img 
              className="logo" 
              src={logoImage} 
              alt="Logo" 
            />
            <img 
              className="mobile-logo" 
              src={mobileLogoImage} 
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
          {/* 3. Use plain URL string for the lock icon stored in public/images/icons/ */}
          <img 
            src="/images/icons/checkout-lock-icon.png" 
            alt="Checkout Lock" 
          />
        </div>
      </div>
    </div>
  );
}