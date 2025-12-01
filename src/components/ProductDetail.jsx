import { useEffect, useState } from "react";
import { useParams } from "react-router";


const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details based on the id
        fetch(`https://692622f226e7e41498f98317.mockapi.io/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    // console.log("id",typeof id);
    
     if (!product) return <div>Loading...</div>;
    return (
        <div>
            <h1>Product Detail Page</h1>
            <p>Displaying details for product ID: {id}</p>
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    )
}

export default ProductDetail;