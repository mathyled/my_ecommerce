import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../styles/ProductDetail.module.css";
import { CarritoContext } from "../context/CarritoContext";

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
      const { agregarAlCarrito } = useContext(CarritoContext);
    

    useEffect(() => {
        // Fetch product details based on the id
        fetch(`https://692622f226e7e41498f98317.mockapi.io/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) return <div className={styles.loading}>Cargando...</div>;
    
    return (
        <div className={styles.productDetailContainer}>
            <div className={styles.productDetail}>
                <h1 className={styles.pageTitle}>Producto Details</h1>
                
                <div className={styles.productContent}>
                    <div className={styles.productImage}>
                        <img src={product.imageUrl} alt={product.name} />
                    </div>
                    
                    <div className={styles.productInfo}>
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productDescription}>{product.description}</p>
                        <p className={styles.productPrice}>${product.price}</p>
                        <button className={styles.addToCartBtn} onClick={() => agregarAlCarrito(product)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;