import Footer from "./Footer"
import NavBar from "./Navbar"
import "../styles/main.css"
import ProductList from "./ProductList"
import { useState, useEffect } from "react"




const Main = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <main>
            <ProductList products={products} />
        </main>
    )
}
export default Main