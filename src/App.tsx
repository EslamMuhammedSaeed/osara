import Home from "@pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "@pages/Product";
import CartPage from "@components/Cart/CartPage";
import { CartProvider } from "@context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
