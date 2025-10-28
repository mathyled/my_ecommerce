
import "./../styles/navbar.css"
import { Link, NavLink } from "react-router";


const NavBar = () => {
    return (
        <nav className="navbar">
        <ul className="nav-links">
            <li><Link to="/"> Home </Link></li>
              <li><Link to="/cart"><i className="fas fa-shopping-cart"></i></Link></li>
             <li> <Link to="/register" > Register </Link></li>
              <li><Link to="/login"> Login </Link></li>
        </ul>
        </nav>
    )
}
export default NavBar;