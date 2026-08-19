import { Product } from "./Product";

export function ProductsGrid({ products = [], loadcart }) {
  // Safety check: ensure products is always a valid array
  let safeProducts = [];
  
  if (Array.isArray(products)) {
    safeProducts = products;
  } else if (products && Array.isArray(products.products)) {
    // Handles responses structured like { products: [...] }
    safeProducts = products.products;
  } else if (products && Array.isArray(products.data)) {
    // Handles responses structured like { data: [...] }
    safeProducts = products.data;
  }

  if (safeProducts.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        No products available.
      </div>
    );
  }

  return (
    <div className="products-grid">
      {safeProducts.map((product) => {
        return (
          <Product key={product.id} product={product} loadcart={loadcart} />
        );
      })}
    </div>
  );
}