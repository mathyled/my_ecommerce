import { useContext } from "react";
import { CarritoContext } from '../context/CarritoContext.js'
import "../index.css"
const Cart = () => {
    const { carrito, vaciarCarrito, incrementar, decrementar, eliminarProducto, totalItems } = useContext(CarritoContext);

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <h2>Shopping Cart | ITEMS {totalItems}</h2>

                {carrito.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {carrito.map((item) => (
                            <li key={item.id} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <div>{item.title}</div>
                                        <div>${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <button onClick={() => decrementar(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => incrementar(item.id)}>+</button>
                                    </div>
                                    <div>
                                        <button onClick={() => eliminarProducto(item.id)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {carrito.length > 0 && (
                    <button onClick={vaciarCarrito}>Empty Cart</button>
                )}
            </div>
        </div>
    )
}
export default Cart;