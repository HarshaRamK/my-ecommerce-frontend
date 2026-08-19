import "./HomePage.css";
import { Header } from "../../component/Header";
import { useEffect,useState } from "react";
import axios from 'axios'
import { useSearchParams } from "react-router";
import { ProductsGrid } from "./ProductsGrid";
export function HomePage({cart,loadcart}) {
    const [products,setProducts]=useState([])
    const [searchParams]=useSearchParams();
    const search=searchParams.get('search') || '';

    useEffect(()=>{
        const getHomeData=async ()=>{
           const response=await axios.get('/api/products', {
             params: search ? { search } : {}
           })
            setProducts(response.data)
        }
      getHomeData()
    },[search])
    
  return (
    <>
      <link rel="icon" type="image/png" href="/images/home-favicon.png" />
      <Header cart={cart} />

      <div className="home-page">
       {search && (
         <div className="search-results-title">
           Search results for &quot;{search}&quot;
         </div>
       )}
       {search && products.length === 0 && (
         <div className="no-search-results">No products found.</div>
       )}
       <ProductsGrid products={products} loadcart={loadcart} />
      </div>
    </>
  );
}
