import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/updateProduct.module.css";

const UpdateProduct = () => {
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const existingProduct = state?.product ?? null;

  const [product, setProduct] = useState(() => ({
    id: existingProduct?.id ?? params.id ?? "",
    name: existingProduct?.name ?? "",
    description: existingProduct?.description ?? "",
    price: existingProduct?.price ?? "",
    imageUrl: existingProduct?.imageUrl ?? ""
  }));

  const [loading, setLoading] = useState(!existingProduct && !!params.id);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!existingProduct && params.id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `https://692622f226e7e41498f98317.mockapi.io/products/${params.id}`
          );
          if (!res.ok) throw new Error(`Product not found (${res.status})`);
          const data = await res.json();
          setProduct({
            id: data.id,
            name: data.name ?? "",
            description: data.description ?? "",
            price: data.price ?? "",
            imageUrl: data.imageUrl ?? ""
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [existingProduct, params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (p) => {
    const errs = {};
    if (!p.name || p.name.trim().length < 3) errs.name = "Name must be at least 3 characters";
    if (!p.description || p.description.trim().length < 10)
      errs.description = "Description must be at least 10 characters";
    if (p.price === "" || Number.isNaN(Number(p.price)) || Number(p.price) <= 0)
      errs.price = "Price must be a number greater than 0";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(product);
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const payload = { ...product, price: Number(product.price) };
      const res = await fetch(
        `https://692622f226e7e41498f98317.mockapi.io/products/${product.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Error updating product (${res.status}) ${txt}`);
      }
      await res.json();
      navigate(-1);
    } catch (err) {
      setError(err.message || "Error updating product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className={styles.productPage}>
        <div className={styles.productContent}>
          <div className={styles.productCard}>Loading product...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className={styles.productPage}>
        <div className={styles.productContent}>
          <div className={styles.productCard}>Error: {error}</div>
        </div>
      </div>
    );

  return (
    <div className={styles.productPage}>
      <div className={styles.productContent}>
        <div className={styles.productCard}>
          <h2 className={styles.productTitle}>Edit Product</h2>

          <form className={styles.productForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.productFormGroup}>
              <label className={styles.productLabel}>Name</label>
              <input
                className={`${styles.productInput} ${fieldErrors.name ? styles.invalid : ""}`}
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product name"
              />
              {fieldErrors.name && <div className={styles.productFeedback}>{fieldErrors.name}</div>}
            </div>

            <div className={styles.productFormGroup}>
              <label className={styles.productLabel}>Price</label>
              <input
                className={`${styles.productInput} ${fieldErrors.price ? styles.invalid : ""}`}
                name="price"
                type="number"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                placeholder="0.00"
              />
              {fieldErrors.price && <div className={styles.productFeedback}>{fieldErrors.price}</div>}
            </div>

            <div className={styles.productFormGroup}>
              <label className={styles.productLabel}>Description</label>
              <textarea
                className={`${styles.productInput} ${fieldErrors.description ? styles.invalid : ""}`}
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Product description"
              />
              {fieldErrors.description && (
                <div className={styles.productFeedback}>{fieldErrors.description}</div>
              )}
            </div>

            <div className={styles.productFormGroup}>
              <label className={styles.productLabel}>Image URL</label>
              <input
                className={styles.productInput}
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className={styles.productActions}>
              <button
                className={`${styles.productBtn} ${styles.productBtnPrimary}`}
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Update Product"}
              </button>
              <button
                className={styles.productBtn}
                type="button"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                Cancel
              </button>
            </div>

            {error && <div className={styles.productFeedbackGlobal}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;