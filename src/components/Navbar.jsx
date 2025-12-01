import styles from "../styles/navbar.module.css"
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.js'
import { CarritoContext } from '../context/CarritoContext.js'
import { useContext } from "react";

const NavBar = () => {

    const {  user, logout } = useContext(AuthContext);
    const { carrito } = useContext(CarritoContext);

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li><NavLink to="/" className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}>Home</NavLink></li>
             
                {user ? (
                    <>
                        <span className={styles.navUser}>Hello, {user}!</span>
                        <button className={styles.navLogout} onClick={logout}>Logout</button>
                    </>
                ) : (
                        <>
                    <li><NavLink to="/register" className={({isActive}) => isActive ? styles.navLinkActive : styles.navLink}>Register</NavLink></li>
                    <li><NavLink to="/login" className={({isActive}) => isActive ? styles.navLinkActive : styles.navLink}>Login</NavLink></li>
                        </>
                )}
                  <li><NavLink to="/cart" className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}>
                    <i className="fas fa-shopping-cart"></i> Cart ({carrito.length})
                </NavLink></li>
            </ul>
        </nav>
    )
}
export default NavBar;