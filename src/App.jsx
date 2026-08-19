import './App.css'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { HomePage } from './pages/home/HomePage'
import { Routes,Route } from 'react-router'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { ErrorPage } from './pages/ErrorPage'
import { useEffect,useState } from 'react'
import axios from 'axios'
function App() {
    const [cart,setCart]=useState([])
          const loadcart=async ()=>{
          const response=await axios.get('/api/cart-items?expand=product')
          setCart(response.data)       
       }
    useEffect(()=>
    {
       loadcart()       
    },[])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadcart={loadcart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadcart={loadcart} />} />
      <Route path='orders' element={<OrdersPage cart={cart} loadcart={loadcart} />} />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
      <Route path='*' element={<ErrorPage />} />

    </Routes>

    
  )
}

export default App
