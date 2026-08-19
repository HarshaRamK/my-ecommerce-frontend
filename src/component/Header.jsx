import './Header.css';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';

export function Header({ cart = [] }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  // Safely compute total quantity
  let totalQuantity = 0;
  if (Array.isArray(cart)) {
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity || 0;
    });
  }

  const runSearch = () => {
    const trimmed = search.trim();
    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      runSearch();
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} alt="Company Logo" />
          <img className="mobile-logo" src={MobileLogoWhite} alt="Mobile Logo" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="search-button" onClick={runSearch} aria-label="Search">
          <img className="search-icon" src={SearchIcon} alt="Search icon" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} alt="Cart icon" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}

// import './Header.css'
// import { NavLink, useNavigate, useSearchParams } from 'react-router'
// import { useState } from 'react'
// import CartIcon from '../assets/images/icons/cart-icon.png'
// import SearchIcon from '../assets/images/icons/search-icon.png';
// import LogoWhite from '../assets/images/logo-white.png';
// import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
// export function Header({cart=[]}) {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [search, setSearch] = useState(searchParams.get('search') || '');

//   let totalQuantity=0
//   cart.forEach((cartItem) => {
//     totalQuantity+=cartItem.quantity 
//   });

//   const runSearch = () => {
//     const trimmed = search.trim();
//     if (trimmed) {
//       navigate(`/?search=${encodeURIComponent(trimmed)}`);
//     } else {
//       navigate('/');
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       runSearch();
//     }
//   };

//   return (
//     <>
//       <div className="header">
//         <div className="left-section">
//           <NavLink to="/" className="header-link">
//             <img className="logo" src={LogoWhite} />
//             <img className="mobile-logo" src={MobileLogoWhite} />
//           </NavLink>
//         </div>

//         <div className="middle-section">
//           <input
//             className="search-bar"
//             type="text"
//             placeholder="Search"
//             value={search}
//             onChange={(event) => setSearch(event.target.value)}
//             onKeyDown={handleKeyDown}
//           />

//           <button className="search-button" onClick={runSearch}>
//             <img className="search-icon" src={SearchIcon} />
//           </button>
//         </div>

//         <div className="right-section">
//           <NavLink className="orders-link header-link" to="/orders">
//             <span className="orders-text">Orders</span>
//           </NavLink>

//           <NavLink className="cart-link header-link" to="/checkout">
//             <img className="cart-icon" src={CartIcon} />
//             <div className="cart-quantity">{totalQuantity}</div>
//             <div className="cart-text">Cart</div>
//           </NavLink>

          
//         </div>
//       </div>
//     </>
//   );
// }
