import { Header } from "../../component/Header";
import "./OrdersPage.css";
import axios from "axios";
import { useState, useEffect } from "react";

import { OrdersGrid } from "./OrdersGrid";
export function OrdersPage({ cart, loadcart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrderData();
  }, []);
  return (
    <>
      <link rel="icon" type="image/png" href="/images/orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        {orders.length === 0 ? (
          <div className="no-orders-message">You have no orders yet.</div>
        ) : (
          <OrdersGrid orders={orders} loadcart={loadcart} />
        )}
      </div>
    </>
  );
}
