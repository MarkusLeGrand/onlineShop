import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuthStore } from './stores/authStore';
import { useCartStore } from './stores/cartStore';

import Home from './pages/Home';
import HomeV2 from './pages/HomeV2';
import HomeV3 from './pages/HomeV3';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductDetailV2 from './pages/ProductDetailV2';
import ProductDetailV3 from './pages/ProductDetailV3';
import Showcase from './pages/Showcase';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Dashboard from './pages/admin/Dashboard';
import ProductManager from './pages/admin/ProductManager';
import OrderManager from './pages/admin/OrderManager';

function App() {
  const { token, fetchMe } = useAuthStore();
  const { fetchCart } = useCartStore();

  useEffect(() => {
    if (token) {
      fetchMe();
      fetchCart();
    }
  }, [token, fetchMe, fetchCart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public - Home versions */}
          <Route path="/" element={<Home />} />
          <Route path="/v2" element={<HomeV2 />} />
          <Route path="/v3" element={<HomeV3 />} />
          <Route path="/showcase" element={<Showcase />} />

          {/* Public - Product pages */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/v2/products/:slug" element={<ProductDetailV2 />} />
          <Route path="/v3/products/:slug" element={<ProductDetailV3 />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Route>

          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductManager />} />
            <Route path="/admin/orders" element={<OrderManager />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
