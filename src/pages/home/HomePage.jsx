import "./HomePage.css";
import { Header } from "../../component/Header";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSearchParams } from "react-router";
import { ProductsGrid } from "./ProductsGrid";

// Prepend your live Render backend URL
const BACKEND_URL = "https://my-ecommerce-backend-ajxk.onrender.com";

export function HomePage({ cart, loadcart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const getHomeData = async () => {
      setLoading(true);
      try {
        // Point to your live backend URL
        const response = await axios.get(`${BACKEND_URL}/api/products`, {
          params: search ? { search } : {}
        });

        // Ensure state is set to an array to prevent crashes
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("API did not return an array:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to empty array on network/404 errors
      } finally {
        setLoading(false);
      }
    };

    getHomeData();
  }, [search]);

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

        {loading ? (
          <div style={{ padding: "20px", textAlign: "center" }}>
            Loading products... (Please wait ~30s if backend is waking up)
          </div>
        ) : (
          <>
            {search && products.length === 0 && (
              <div className="no-search-results">No products found.</div>
            )}
            <ProductsGrid products={products} loadcart={loadcart} />
          </>
        )}
      </div>
    </>
  );
}

// import "./HomePage.css";
// import { Header } from "../../component/Header";
// import { useEffect,useState } from "react";
// import axios from 'axios'
// import { useSearchParams } from "react-router";
// import { ProductsGrid } from "./ProductsGrid";
// export function HomePage({cart,loadcart}) {
//     const [products,setProducts]=useState([])
//     const [searchParams]=useSearchParams();
//     const search=searchParams.get('search') || '';

//     useEffect(()=>{
//         const getHomeData=async ()=>{
//            const response=await axios.get('/api/products', {
//              params: search ? { search } : {}
//            })
//             setProducts(response.data)
//         }
//       getHomeData()
//     },[search])
    
//   return (
//     <>
//       <link rel="icon" type="image/png" href="/images/home-favicon.png" />
//       <Header cart={cart} />

//       <div className="home-page">
//        {search && (
//          <div className="search-results-title">
//            Search results for &quot;{search}&quot;
//          </div>
//        )}
//        {search && products.length === 0 && (
//          <div className="no-search-results">No products found.</div>
//        )}
//        <ProductsGrid products={products} loadcart={loadcart} />
//       </div>
//     </>
//   );
// }
