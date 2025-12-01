// ...existing code...
import { useState } from "react";
import styles from "../styles/productForm.module.css";

const initialState = {
  name: "",
  description: "",
  price: "",
  imageUrl: ""
};

const ProductForm = () => {
  const [product, setProduct] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const validate = (p) => {
    const nuevosErrores = {};
    if (!p.name.trim()) nuevosErrores.name = "El nombre es obligatorio.";
    if (!p.description.trim() || p.description.trim().length < 10)
      nuevosErrores.description = "La descripción debe tener al menos 10 caracteres.";
    if (p.price === "" || Number.isNaN(Number(p.price)) || Number(p.price) <= 0)
      nuevosErrores.price = "El precio debe ser un número mayor a 0.";
    if (p.imageUrl && p.imageUrl.trim()) {
      try {
        const u = new URL(p.imageUrl);
        if (!/^https?:/.test(u.protocol)) nuevosErrores.imageUrl = "La URL debe usar http(s).";
      } catch {
        nuevosErrores.imageUrl = "La URL no es válida.";
      }
    }
    return nuevosErrores;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: name === "price" ? value : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async (payload) => {
    setSubmitting(true);
    setSuccess(null);
    try {
      const body = { ...payload, price: Number(payload.price) };
      const res = await fetch("https://692622f226e7e41498f98317.mockapi.io/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Error al agregar el producto.");
      const data = await res.json();
      setSuccess("Producto agregado correctamente.");
      setProduct(initialState);
      setErrors({});
      return data;
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message || "Error desconocido." }));
      throw err;
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = validate(product);
    setErrors(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;
    try {
      await onSubmit(product);
    } catch {
      /* error already set */
    }
  };

  return (
    <div className={styles.container}>
    <form  onSubmit={handleOnSubmit} noValidate>
      <h2 className={styles.title}>Agregar producto</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre</label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
          placeholder="Nombre del producto"
          />
        {errors.name && <div className={styles.feedback}>{errors.name}</div>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Descripción</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className={`${styles.textarea} ${errors.description ? styles.invalid : ""}`}
          placeholder="Descripción del producto"
        />
        {errors.description && <div className={styles.feedback}>{errors.description}</div>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Precio</label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          className={`${styles.input} ${errors.price ? styles.invalid : ""}`}
          placeholder="0.00"
          />
        {errors.price && <div className={styles.feedback}>{errors.price}</div>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Image URL</label>
        <input
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          className={`${styles.input} ${errors.imageUrl ? styles.invalid : ""}`}
          placeholder="https://..."
          />
        {errors.imageUrl && <div className={styles.feedback}>{errors.imageUrl}</div>}
      </div>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit" disabled={submitting}>
          {submitting ? "Enviando..." : "Agregar producto"}
        </button>
      </div>

      {errors.submit && <div className={styles.errorGlobal}>{errors.submit}</div>}
      {success && <div className={styles.successGlobal}>{success}</div>}
    </form>
          </div>
  );
};

export default ProductForm;
