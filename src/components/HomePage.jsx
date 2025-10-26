import Footer from "./Footer"
import NavBar from "./Navbar"
import "../styles/homepage.css"
import ProductList from "./ProductList"
import { useState, useEffect } from "react"




const HomePage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    console.log(products);

    return (
        <>
            <h1> Welcome to the Home Page </h1>
            <NavBar />
            <ProductList products={products} />
            <Footer />
        </>
    )
}
export default HomePage