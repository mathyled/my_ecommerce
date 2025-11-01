import "./../styles/navbar.css"
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
                <li><NavLink to="/cart" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <i className="fas fa-shopping-cart"></i> Cart
                </NavLink></li>
                <li><NavLink to="/register" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Register</NavLink></li>
                <li><NavLink to="/login" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink></li>
            </ul>
        </nav>
    )
}
export default NavBar;