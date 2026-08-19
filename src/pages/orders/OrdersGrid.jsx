import { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";

// Import images directly from src/assets
import buyAgainIcon from "../../assets/images/icons/buy-again.png";

const BACKEND_URL = "https://my-ecommerce-backend-ajxk.onrender.com";

export function OrdersGrid({ orders = [], loadcart }) {
  const [addedProductIds, setAddedProductIds] = useState([]);
  const safeOrders = Array.isArray(orders) ? orders : [];

  const buyAgain = async (productId) => {
    try {
      await axios.post(`${BACKEND_URL}/api/cart-items`, {
        productId,
        quantity: 1,
      });
      await loadcart();
      setAddedProductIds((current) => [...current, productId]);
      setTimeout(() => {
        setAddedProductIds((current) => current.filter((id) => id !== productId));
      }, 2000);
    } catch (error) {
      console.error("Failed to buy item again:", error);
    }
  };

  return (
    <div className="orders-grid">
      {safeOrders.map((order) => {
        const safeProducts = Array.isArray(order?.products) ? order.products : [];

        return (
          <div key={order.id} className="order-container">
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{dayjs(order.orderTimeMs).format("dddd, MMMM D")}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{formatMoney(order.totalCostCents)}</div>
                </div>
              </div>

              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">
              {safeProducts.map((orderProduct) => {
                const isAdded = addedProductIds.includes(orderProduct.productId);
                return (
                  <Fragment key={`${order.id}-${orderProduct.productId}`}>
                    <div className="product-image-container">
                      <img 
                        src={orderProduct.product?.image} 
                        alt={orderProduct.product?.name || "Product image"} 
                      />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {orderProduct.product?.name}
                      </div>
                      <div className="product-delivery-date">
                        Arriving on:{" "}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
                      </div>
                      <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                      </div>
                      <button
                        className="buy-again-button button-primary"
                        onClick={() => buyAgain(orderProduct.productId)}
                      >
                        {/* Use imported icon variable here */}
                        <img
                          className="buy-again-icon"
                          src={buyAgainIcon}
                          alt="Buy again"
                        />
                        <span className="buy-again-message">
                          {isAdded ? 'Added to Cart' : 'Add to Cart'}
                        </span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <Link
                        to={`/tracking?orderId=${order.id}&productId=${orderProduct.productId}`}
                      >
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </Link>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// import { Fragment, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router";
// import { formatMoney } from "../../utils/money";
// import dayjs from "dayjs";
// export function OrdersGrid({orders, loadcart}) {
//   const [addedProductIds, setAddedProductIds] = useState([]);

//   const buyAgain = async (productId) => {
//     await axios.post("/api/cart-items", {
//       productId,
//       quantity: 1,
//     });
//     await loadcart();
//     setAddedProductIds((current) => [...current, productId]);
//     setTimeout(() => {
//       setAddedProductIds((current) => current.filter((id) => id !== productId));
//     }, 2000);
//   };

//   return (

//       <div className="orders-grid">
//         {orders.map((order) => {
//           return (
//             <div key={order.id} className="order-container">
//               <div className="order-header">
//                 <div className="order-header-left-section">
//                   <div className="order-date">
//                     <div className="order-header-label">Order Placed:</div>
//                     <div>{dayjs(order.orderTimeMs).format("dddd, MMMM D")}</div>
//                   </div>
//                   <div className="order-total">
//                     <div className="order-header-label">Total:</div>
//                     <div>{formatMoney(order.totalCostCents)}</div>
//                   </div>
//                 </div>

//                 <div className="order-header-right-section">
//                   <div className="order-header-label">Order ID:</div>
//                   <div>{order.id}</div>
//                 </div>
//               </div>

//               <div className="order-details-grid">
//                 {order.products.map((orderProduct) => {
//                   const isAdded = addedProductIds.includes(orderProduct.productId);
//                   return (
//                     <Fragment key={`${order.id}-${orderProduct.productId}`}>
//                       <div className="product-image-container">
//                         <img src={orderProduct.product.image} />
//                       </div>

//                       <div className="product-details">
//                         <div className="product-name">
//                           {orderProduct.product.name}
//                         </div>
//                         <div className="product-delivery-date">
//                           Arriving on:{" "}
//                           {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
//                             "MMMM D",
//                           )}
//                         </div>
//                         <div className="product-quantity">
//                           Quantity: {orderProduct.quantity}
//                         </div>
//                         <button
//                           className="buy-again-button button-primary"
//                           onClick={() => buyAgain(orderProduct.productId)}
//                         >
//                           <img
//                             className="buy-again-icon"
//                             src="images/icons/buy-again.png"
//                           />
//                           <span className="buy-again-message">
//                             {isAdded ? 'Added to Cart' : 'Add to Cart'}
//                           </span>
//                         </button>
//                       </div>

//                       <div className="product-actions">
//                         <Link
//                           to={`/tracking?orderId=${order.id}&productId=${orderProduct.productId}`}
//                         >
//                           <button className="track-package-button button-secondary">
//                             Track package
//                           </button>
//                         </Link>
//                       </div>
//                     </Fragment>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//   );
// }
