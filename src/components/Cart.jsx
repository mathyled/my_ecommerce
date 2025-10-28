import { useContext } from "react";
import { CarritoContext } from '../context/CarritoContext.js'
// import { CarritoProvider } from '../context//CarritoProvider.jsx'

const Cart = () => {

    const  {carrito, vaciarCarrito } = useContext(CarritoContext)
    return (
        <>
        <h1>Cart Page </h1>
{carrito.length === 0 ? (
    <p>Your cart is empty</p>
) : (
    <ul>
        {carrito.map((item, index) => (
            <li key={index}>
                {item.title} - ${item.price}
            </li>
        ))}
    </ul>
)  
}
{carrito.length > 0 && (
    <button onClick={vaciarCarrito}>Empty Cart</button>
)}
        </>
    )
}
export default Cart;