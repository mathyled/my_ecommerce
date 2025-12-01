import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/productCard.module.css";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product, onProductDeleted }) => {
  const { user } = useContext(AuthContext);

  const isAdmin = user === "admin";
  
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://692622f226e7e41498f98317.mockapi.io/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting the product.");

      // Llamar callback para actualizar lista
      if (typeof onProductDeleted === 'function') {
        onProductDeleted(id);
      }
      alert("Product deleted successfully.");
    } catch (err) {
      alert(err.message || "Unknown error deleting the product.");
    }
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <h2 className={styles.productName}>{product.name}</h2>
      <p className={styles.productPrice}>Price: ${product.price}</p>
      <button className={styles.buyBtn} onClick={() => agregarAlCarrito(product)}>
        Buy
      </button>

      {isAdmin && (
        <div className={styles.adminActions}>
          <button
            className={styles.updateBtn}
            onClick={() =>
              navigate("/dashboard/edit", {
                state: { product: product },
              })
            }
          >
            Edit
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;