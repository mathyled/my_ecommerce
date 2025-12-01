import { useContext } from "react";
import { CarritoContext } from '../context/CarritoContext.js'
import styles from "../styles/cart.module.css"
import { AuthContext } from "../context/AuthContext.js";
import { Navigate } from "react-router";

const Cart = () => {
    const { user } = useContext(AuthContext) || {};
    const { carrito, vaciarCarrito, incrementar, decrementar, eliminarProducto, totalItems } = useContext(CarritoContext);

    // Redirect if not authenticated
    if (!user) return <Navigate to="/login" replace />;
    
    const subtotal = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    const handlePago = () => {
        const confirmPago = window.confirm("Do you want to proceed to payment?");
        if (confirmPago) {
            alert("Processing payment...");
            vaciarCarrito()
            // Payment logic would go here
        } else {
            alert("Payment cancelled");
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Your Cart</h1>
                <div className={styles.user}>User: <strong>{user}</strong></div>
            </header>

            {carrito.length === 0 ? (
                <div className={styles.empty}>Your cart is empty</div>
            ) : (
                <ul className={styles.list}>
                    {carrito.map((item) => (
                        <li key={item.id} className={styles.item}>
                            <div className={styles.media}>
                                <img src={item.imageUrl} alt={item.title} className={styles.img} />
                            </div>

                            <div className={styles.info}>
                                <div className={styles.name}>{item.title}</div>
                                <div className={styles.price}>${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</div>
                            </div>

                            <div className={styles.actions}>
                                <label className={styles.qtyLabel}>Quantity:</label>
                                <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                                    <button className={styles.btn} onClick={() => decrementar(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className={styles.btn}  onClick={() => incrementar(item.id)}>+</button>
                                </div>
                                <button className={styles.btn} onClick={() => eliminarProducto(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            
            <span className={styles.totalItems}>Total items: {totalItems}</span>
            <span className={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</span>

            {carrito.length > 0 && (
                <div className={styles.footer}>
                    <button className={`${styles.btn} ${styles.clear}`} onClick={vaciarCarrito}>Empty Cart</button>
                    <button className={`${styles.btn} ${styles.checkout}`} onClick={handlePago}>
                        Purchase
                    </button>
                </div>
            )}
        </div>
    )
}

export default Cart;