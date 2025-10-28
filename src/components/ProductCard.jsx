
import { Link } from "react-router";
import "../styles/product.css"
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const ProductCard = ({ product }) => {
    const {agregarAlCarrito} = useContext(CarritoContext);
    return (
        <div className="product-card">
             <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} /></Link>
            <h2>{product.title}</h2>
            {/* <p>{product.description}</p> */}
            <p>Price: ${product.price}</p>
                 <button onClick={() => agregarAlCarrito(product)}>Add to Cart</button>
        </div>
    )
}
export default ProductCard;