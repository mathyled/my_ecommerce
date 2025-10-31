import React, { useState, useMemo, useCallback } from "react";
import { CarritoContext } from "./CarritoContext.js";

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]); // cada item: { id, title, price, image, quantity }

  const agregarAlCarrito = useCallback((producto) => {
    setCarrito(prev => {
      const idx = prev.findIndex(i => i.id === producto.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
  }, []);

  const incrementar = useCallback((id) => {
    setCarrito(prev => prev.map(it => it.id === id ? { ...it, quantity: it.quantity + 1 } : it));
  }, []);

  const decrementar = useCallback((id) => {
    setCarrito(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (item.quantity <= 1) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  }, []);

  const eliminarProducto = useCallback((id) => {
    setCarrito(prev => prev.filter(i => i.id !== id));
  }, []);

  const vaciarCarrito = useCallback(() => setCarrito([]), []);

  const totalItems = useMemo(() => carrito.reduce((acc, it) => acc + it.quantity, 0), [carrito]);

  const value = useMemo(() => ({
    carrito,
    agregarAlCarrito,
    incrementar,
    decrementar,
    eliminarProducto,
    vaciarCarrito,
    totalItems
  }), [carrito, agregarAlCarrito, incrementar, decrementar, eliminarProducto, vaciarCarrito, totalItems]);

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoProvider;