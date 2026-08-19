import axios from "axios";
import { useRef, useState } from "react";
import { formatMoney } from "../../utils/money";

const BACKEND_URL = "https://my-ecommerce-backend-ajxk.onrender.com";

export function Product({ product = {}, loadcart }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addedTimeoutRef = useRef(null);

  const addToCart = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/cart-items`, {
        productId: product.id,
        quantity,
      });

      if (typeof loadcart === "function") {
        await loadcart();
      }

      setIsAdded(true);
      if (addedTimeoutRef.current) {
        clearTimeout(addedTimeoutRef.current);
      }
      addedTimeoutRef.current = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const selectQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  // Safe image path formatter ensuring leading slash for public assets
  const getImagePath = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
      return path;
    }
    return `/${path}`;
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img 
          className="product-image" 
          src={getImagePath(product.image)} 
          alt={product.name || "Product image"} 
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        {product.rating && (
          <>
            <img
              className="product-rating-stars"
              src={`/images/ratings/rating-${Math.round(product.rating.stars * 10)}.png`}
              alt={`${product.rating.stars} stars`}
            />
            <div className="product-rating-count link-primary">
              {product.rating.count}
            </div>
          </>
        )}
      </div>

      <div className="product-price">{formatMoney(product.priceCents || 0)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: isAdded ? 1 : 0 }}>
        <img src="/images/icons/checkmark.png" alt="Checkmark" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

// import axios from "axios";
// import { useRef, useState } from "react";
// import { formatMoney } from "../../utils/money";

// export function Product({product,loadcart}) {
//     const [quantity,setQuantity]=useState(1)
//     const [isAdded,setIsAdded]=useState(false)
//     const addedTimeoutRef=useRef(null)

//     const addToCart=async () => {
//           await axios.post("/api/cart-items", {
//             productId: product.id,
//             quantity,
//           });
//           await loadcart();

//           setIsAdded(true)
//           if (addedTimeoutRef.current) {
//             clearTimeout(addedTimeoutRef.current)
//           }
//           addedTimeoutRef.current = setTimeout(() => {
//             setIsAdded(false)
//           }, 2000)
//         }
//     const selectQuantity=(event) => {
//             const quantitySelected = Number(event.target.value);
//             setQuantity(quantitySelected);
//           }
//   return (
//     <div className="product-container">
//       <div className="product-image-container">
//         <img className="product-image" src={product.image} />
//       </div>

//       <div className="product-name limit-text-to-2-lines">{product.name}</div>

//       <div className="product-rating-container">
//         {
//           <img
//             className="product-rating-stars"
//             src={`images/ratings/rating-${product.rating.stars * 10}.png`}
//           />
//         }
//         <div className="product-rating-count link-primary">
//           {product.rating.count}
//         </div>
//       </div>

//       <div className="product-price">{formatMoney(product.priceCents)}</div>

//       <div className="product-quantity-container">
//         <select
//           value={quantity}
//           onChange={selectQuantity}
//         >
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//           <option value="9">9</option>
//           <option value="10">10</option>
//         </select>
//       </div>

//       <div className="product-spacer"></div>

//       <div className="added-to-cart" style={{opacity: isAdded ? 1 : 0}}>
//         <img src="images/icons/checkmark.png" />
//         Added
//       </div>

//       <button
//         className="add-to-cart-button button-primary"
//         onClick={addToCart}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }
