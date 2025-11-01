import "../styles/main.css"
import ProductList from "./ProductList"
import { useState, useEffect } from "react"
import LoadingSpinner from "./LoadingSpinner"




const Main = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json();
        setProducts(data)
        if (!response.ok) { throw new Error("Failed to fetch products") }
      } catch (error) {
        console.log(error.message);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts()
  }, [])
  return (
    <main className="main-container" >
      <div className="content-wrapper">
        {loading && <LoadingSpinner />}
        {error && <div>Error: {error}</div>}
        {!loading && !error && <ProductList products={products} />}
      </div>
    </main>
  )
}
export default Main