import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './components/HomePage.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Cart from './components/Cart.jsx'
import RuteProtected from './components/RuteProtected.jsx'
import ProductDetail from './components/ProductDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/products:id" element={<ProductDetail />} />
    <Route path="/cart" element={<RuteProtected isAuthenticated={false}><Cart /></RuteProtected>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
