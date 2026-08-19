import { Link } from "react-router";

// Import images directly from src/assets
import logoImage from "../../assets/images/logo.png";
import mobileLogoImage from "../../assets/images/mobile-logo.png";
import checkoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";

export function CheckoutHeader({ cart = [] }) {
  const itemCount = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={logoImage} alt="Logo" />
              <img className="mobile-logo" src={mobileLogoImage} alt="Logo" />
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
            <img src={checkoutLockIcon} alt="Checkout Lock" />
          </div>
        </div>
      </div>
    </>
  );
}