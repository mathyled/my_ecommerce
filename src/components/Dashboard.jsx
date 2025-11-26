import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import "../styles/dashboard.css";
import { NavLink } from "react-router";

const demoProducts = [
  { id: 1, title: "Camiseta básica", price: 19.99, img: "https://picsum.photos/seed/p1/600/600" },
  { id: 2, title: "Chaqueta vaquera", price: 79.99, img: "https://picsum.photos/seed/p2/600/600" },
  { id: 3, title: "Pantalón chino", price: 49.99, img: "https://picsum.photos/seed/p3/600/600" },
  { id: 4, title: "Vestido veraniego", price: 59.99, img: "https://picsum.photos/seed/p4/600/600" },
  { id: 5, title: "Sudadera con capucha", price: 39.99, img: "https://picsum.photos/seed/p5/600/600" },
  { id: 6, title: "Zapatillas deportivas", price: 89.99, img: "https://picsum.photos/seed/p6/600/600" }
];

const Dashboard = () => {
  const { user } = useContext(AuthContext) || {};
  const totalProducts = demoProducts.length;
  const totalOrders = 128; // placeholder
  const revenue = 15490; // placeholder

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Panel de control</h1>
        <p className="dashboard-greet">Bienvenido{user ? `, ${user}` : ""}</p>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{totalProducts}</div>
          <div className="stat-label">Productos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalOrders}</div>
          <div className="stat-label">Órdenes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${revenue.toLocaleString()}</div>
          <div className="stat-label">Ingresos</div>
        </div>
      </section>

      <section className="dashboard-actions">
        {/* <button className="btn btn-primary">Añadir producto</button> */}
        <NavLink className="btn btn-primary" to="/dashboard/add" >Añadir producto</NavLink>
        <button className="btn">Ver pedidos</button>
        <button className="btn">Gestión de inventario</button>
      </section>

      <section className="dashboard-products">
        <h2>Productos destacados</h2>
        <div className="product-grid">
          {demoProducts.map(p => (
            <article className="product-tile" key={p.id}>
              <div className="product-media">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{p.title}</h3>
                <div className="product-price">${p.price}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;