import "./../styles/navbar.css"
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.js'
import { CarritoContext } from '../context/CarritoContext.js'
import { useContext } from "react";

const NavBar = () => {

    const {  user, logout } = useContext(AuthContext);
    const { carrito } = useContext(CarritoContext);

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
                <li><NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <i className="fas fa-shopping-cart"></i> Cart ({carrito.length})
                </NavLink></li>
                {user ? (
                    <>
                        <span className="nav-user">Hello, {user}!</span>
                        <button className="nav-logout" onClick={logout}>Logout</button>
                    </>
                ) : (
                        <>
                    <li><NavLink to="/register" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Register</NavLink></li>
                    <li><NavLink to="/login" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink></li>
                        </>
                )}
            </ul>
        </nav>


    )
}
export default NavBar;