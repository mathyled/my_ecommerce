import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/productCard.module.css";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";



const ProductCard = ({ product, onProductDeleted }) => {
  const { user } = useContext(AuthContext);

  const isAdmin = user=== "admin";
  
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://692622f226e7e41498f98317.mockapi.io/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar el producto.");

      // Llamar callback para actualizar lista
      if (typeof onProductDeleted === 'function') {
        onProductDeleted(id);
      }
      alert("Producto eliminado correctamente.");
    } catch (err) {
      alert(err.message || "Error desconocido al eliminar el producto.");
    }
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <h2 className={styles.productName}>{product.name}</h2>
      <p className={styles.productPrice}>Precio: ${product.price}</p>
      <button className={styles.buyBtn} onClick={() => agregarAlCarrito(product)}>
        Comprar
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
            Editar
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteProduct(product.id)}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;