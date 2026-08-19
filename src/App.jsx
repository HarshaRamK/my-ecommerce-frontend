// import './App.css'
// import { CheckoutPage } from './pages/checkout/CheckoutPage'
// import { HomePage } from './pages/home/HomePage'
// import { Routes,Route } from 'react-router'
// import { OrdersPage } from './pages/orders/OrdersPage'
// import { TrackingPage } from './pages/TrackingPage'
// import { ErrorPage } from './pages/ErrorPage'
// import { useEffect,useState } from 'react'
// import axios from 'axios'
// function App() {
//     const [cart,setCart]=useState([])
//           const loadcart=async ()=>{
//           const response=await axios.get('/api/cart-items?expand=product')
//           setCart(response.data)       
//        }
//     useEffect(()=>
//     {
//        loadcart()       
//     },[])
//   return (
//     <Routes>
//       <Route index element={<HomePage cart={cart} loadcart={loadcart} />} />
//       <Route path="checkout" element={<CheckoutPage cart={cart} loadcart={loadcart} />} />
//       <Route path='orders' element={<OrdersPage cart={cart} loadcart={loadcart} />} />
//       <Route path="tracking" element={<TrackingPage cart={cart} />} />
//       <Route path='*' element={<ErrorPage />} />

//     </Routes>

    
//   )
// }

// export default App


import './App.css'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { HomePage } from './pages/home/HomePage'
import { Routes, Route } from 'react-router'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { ErrorPage } from './pages/ErrorPage'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Set your live Render backend base URL
const BACKEND_URL = 'https://my-ecommerce-backend-ajxk.onrender.com';

function App() {
  const [cart, setCart] = useState([]);

  const loadcart = async () => {
    try {
      // 1. Prepend backend URL to the API call
      const response = await axios.get(`${BACKEND_URL}/api/cart-items?expand=product`);

      // 2. Safely verify response data is an array before setting state
      if (Array.isArray(response.data)) {
        setCart(response.data);
      } else if (response.data && Array.isArray(response.data.cart)) {
        setCart(response.data.cart);
      } else {
        console.error("Cart API response is not an array:", response.data);
        setCart([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error loading cart items from backend:", error);
      setCart([]); // Prevent app crash if backend fails or is waking up
    }
  };

  useEffect(() => {
    loadcart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadcart={loadcart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadcart={loadcart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} loadcart={loadcart} />} />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;