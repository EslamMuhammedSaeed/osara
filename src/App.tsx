import Home from "@pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "@pages/Product";
import CartPage from "@components/Cart/CartPage";
import { CartProvider } from "@context/CartContext";

// Admin imports
import Login from "@pages/admin/Login";
import Dashboard from "@pages/admin/Dashboard";
import OrderManagement from "@pages/admin/OrderManagement";
import ProductManagement from "@pages/admin/ProductManagement";
import AdminManagement from "@pages/admin/AdminManagement";
import AdminLayout from "@components/admin/AdminLayout";
import ProtectedRoute from "@components/admin/ProtectedRoute";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/admins" element={<AdminManagement />} />
              <Route path="/admin/reports" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
