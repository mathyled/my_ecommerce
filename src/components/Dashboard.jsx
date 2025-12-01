
import styles from "../styles/dashboard.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate("/dashboard/add");
    };

    const handleEditProduct = () => {
        navigate("/");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            

            <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.btnAdd}`} onClick={handleAddProduct}>
                    <i className="fas fa-plus"></i> Add Product
                </button>
                <button className={`${styles.btn} ${styles.btnEdit}`} onClick={handleEditProduct}>
                    <i className="fas fa-edit"></i> Edit Product
                </button>
            </div>
        </div>
    );
};

export default Dashboard;