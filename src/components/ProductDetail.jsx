import { useEffect, useState } from "react";
import { useParams } from "react-router";


const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details based on the id
        fetch(`https://fakestoreapi.com/products${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    console.log("id",id);
    
     if (!product) return <div>Loading...</div>;
    return (
        <div>
            <h1>Product Detail Page</h1>
            <p>Displaying details for product ID: {id}</p>
        </div>
    )
}

export default ProductDetail;