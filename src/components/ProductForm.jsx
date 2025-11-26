import { useState } from "react";

const ProductForm = () => {

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        imageUrl: ''
    })
    const [errors, setErrors] = useState({});

    const validarFormulario = () => {
        const nuevosErrores = {};
        
        if (!product.name.trim()) {
            nuevosErrores.name = 'El nombre es obligatorio.';
        }
        if (!product.description.trim() || product.description.length < 10) {
            nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
        }
        if (!product.price || product.price <= 0) {
            nuevosErrores.price = 'El precio debe ser mayor a 0.';
        }
        console.log(nuevosErrores);
        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setProduct({ ...product, [name]: value })
    }

    const onSubmit = async (product) => {
        // onSubmit logic here (e.g., send product data to backend or update state)

        try {
            const respuesta = await
                fetch('https://692622f226e7e41498f98317.mockapi.io/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });
            if (!respuesta.ok) {
                throw new Error('Error al agregar el product.');
            }
            const data = await respuesta.json();
            console.log('Producto agregado:', data);
            alert('Producto agregado correctamente');
        } catch (error) {
            console.error(error.message);
            alert('Hubo un problema al agregar el product.');
        };
    }

    const handleOnSubmit = (e) => {

        e.preventDefault();
        if (validarFormulario()) {
            onSubmit(product);
            console.log('Product submitted:', product);
            setProduct({
                name: '',
                description: '',
                price: 0,
                imageUrl: ''
            })
            setErrors({});
        }


    }

    return (
        <form className="row mb-5" onSubmit={handleOnSubmit}>
            <h2>Add products</h2>
            <div >
                <label className="form-label">Name:</label>
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                <input className="form-control" type="text" value={product.name} name="name" onChange={handleChange} required></input>
            </div>
            <div >
                <label className="form-label">Description:</label>
                <textarea className="form-control" value={product.description} name="description" onChange={handleChange} required></textarea>

            </div>
            <div >
                <label className="form-label">Price:</label>
                <input className="form-control" type="number" value={product.price} name="price" onChange={handleChange} required min="0"></input>
            </div>
            <div >
                <label className="form-label">Image URL:</label>
                <input className="form-control" type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} required></input>
            </div>
            <button className="btn btn-primary" type="submit">Add Product</button>
        </form>
    )
}

export default ProductForm;