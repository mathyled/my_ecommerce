import ProductCard from "./ProductCard"


const ProductList = ({products, handleDeleteProduct}) => {
      
    return (
        <div className="product-list" >{/* Render the list of products here */}
        {products.map(p => (
          <ProductCard product={p} key={p.id}  onProductDeleted={handleDeleteProduct}/>
        ))}
     
  
        </div>
    )
}
export default ProductList;