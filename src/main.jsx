import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Cart from './components/Cart.jsx'
import RuteProtected from './components/RuteProtected.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Main from './components/Main.jsx'
import { CarritoProvider } from './context/CarritoProvider.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProductForm from './components/ProductForm.jsx'
import UpdateProduct from './components/updateProduct.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<RuteProtected isAuthenticated={true}><Cart /></RuteProtected>} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/dashboard" element={< RuteProtected isAuthenticated={true}> <Dashboard /></RuteProtected>} />
              <Route path="/dashboard/add" element={< RuteProtected isAuthenticated={true}> <ProductForm /></RuteProtected>} />
              <Route path="/dashboard/edit" element={< RuteProtected isAuthenticated={true}> < UpdateProduct/></RuteProtected>} />
              <Route path="*" element={<h2>404 Not Found</h2>} />
            </Route>
          </Routes>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
