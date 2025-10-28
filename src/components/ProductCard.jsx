
import { Link } from "react-router";
import "../styles/product.css"

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
             <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} /></Link>
            <h2>{product.title}</h2>
            {/* <p>{product.description}</p> */}
            <p>Price: ${product.price}</p>
                 <button onClick={() => (console.log("add to cart")
                 )}>Add to Cart</button>
        </div>
    )
}
export default ProductCard;