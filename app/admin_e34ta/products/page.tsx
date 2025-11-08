'use client';
import { useEffect, useState } from "react";
import { getAllProducts } from "@/Api/Product/ProductList";
import ProductTable from "./components/ProductTable";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ProductTable products={products} />
    </div>
  );
}
