import { Header } from "../component/Header";
import './TrackingPage.css'
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");
  const [order, setOrder] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
      const match = response.data.products.find(
        (product) => product.productId === productId,
      ) || response.data.products[0];
      setOrderProduct(match);
    };
    fetchOrder();
  }, [orderId, productId]);

  if (!orderId || !order || !orderProduct) {
    return (
      <>
        <link rel="icon" type="image/png" href="/images/tracking-favicon.png" />
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>
            <div className="delivery-date">No tracking information found.</div>
          </div>
        </div>
      </>
    );
  }

  const now = Date.now();
  const orderTimeMs = order.orderTimeMs;
  const estimatedDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs;
  const totalDurationMs = estimatedDeliveryTimeMs - orderTimeMs;
  const preparingEndMs = orderTimeMs + totalDurationMs / 3;
  const shippedEndMs = orderTimeMs + (totalDurationMs * 2) / 3;

  let status = "Preparing";
  let progressPercent = 0;
  if (now >= estimatedDeliveryTimeMs) {
    status = "Delivered";
    progressPercent = 100;
  } else if (now >= shippedEndMs) {
    status = "Shipped";
    progressPercent = 50 + ((now - shippedEndMs) / (estimatedDeliveryTimeMs - shippedEndMs)) * 50;
  } else if (now >= preparingEndMs) {
    status = "Shipped";
    progressPercent = ((now - preparingEndMs) / (shippedEndMs - preparingEndMs)) * 50;
  } else {
    status = "Preparing";
    progressPercent = (Math.max(now - orderTimeMs, 0) / (preparingEndMs - orderTimeMs || 1)) * 25;
  }
  progressPercent = Math.min(100, Math.max(0, progressPercent));

  return (
    <>
    <link rel="icon" type="image/png" href="/images/tracking-favicon.png" />
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {status === 'Delivered' ? 'Delivered on ' : 'Arriving on '}
            {dayjs(estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${status === 'Preparing' ? 'current-status' : ''}`}>Preparing</div>
            <div className={`progress-label ${status === 'Shipped' ? 'current-status' : ''}`}>Shipped</div>
            <div className={`progress-label ${status === 'Delivered' ? 'current-status' : ''}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${progressPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}
