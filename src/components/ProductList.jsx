import ProductCard from "./ProductCard"


const ProductList = ({products}) => {
    
    return (
        <div className="product-list" >{/* Render the list of products here */}
        {products.map(p => (
          <ProductCard product={p} key={p.id} />
        ))}
     
  
        </div>
    )
}
export default ProductList;