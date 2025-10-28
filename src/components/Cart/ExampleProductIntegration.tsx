/**
 * EXAMPLE: Product Page Integration with Shopping Cart
 *
 * This file demonstrates how to integrate the shopping cart
 * into a product page component.
 *
 * Copy and adapt this code for your own product pages.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext";

// Example product type
interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  colors: string[];
  sizes: string[];
}

// Example product data
const exampleProduct: Product = {
  id: 1,
  name: "Sleeve Black T-Shirt",
  price: 80.0,
  images: ["/path/to/image1.jpg", "/path/to/image2.jpg"],
  colors: ["#000000", "#808080"],
  sizes: ["S", "M", "L", "XL", "XXL"],
};

const ExampleProductPage: React.FC = () => {
  // Get cart functions
  const { addToCart, getCartCount } = useCart();
  const navigate = useNavigate();

  // Local state for product options
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handle quantity changes
  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    // Validation
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    // Add item to cart
    addToCart({
      id: exampleProduct.id,
      name: exampleProduct.name,
      price: exampleProduct.price,
      quantity: quantity,
      image: exampleProduct.images[0],
      color: exampleProduct.colors,
      size: selectedSize,
    });

    // Show success message and offer to go to cart
    const goToCart = window.confirm(
      `✅ ${exampleProduct.name} added to cart!\n\nWould you like to view your cart?`
    );

    if (goToCart) {
      navigate("/cart");
    }
  };

  // Get current cart count for display
  const cartCount = getCartCount();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{exampleProduct.name}</h1>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
        ${exampleProduct.price.toFixed(2)}
      </p>

      {/* Color Selection */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Select Color:</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          {exampleProduct.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: color,
                border:
                  selectedColor === index ? "3px solid #000" : "1px solid #ccc",
                cursor: "pointer",
              }}
              title={color}
            />
          ))}
        </div>
        <p>Selected: {exampleProduct.colors[selectedColor]}</p>
      </div>

      {/* Size Selection */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Select Size:</h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {exampleProduct.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              style={{
                padding: "0.75rem 1.5rem",
                border:
                  selectedSize === size ? "2px solid #000" : "1px solid #ccc",
                backgroundColor: selectedSize === size ? "#000" : "#fff",
                color: selectedSize === size ? "#fff" : "#000",
                cursor: "pointer",
                borderRadius: "4px",
                fontWeight: selectedSize === size ? "bold" : "normal",
              }}
            >
              {size}
            </button>
          ))}
        </div>
        {selectedSize && <p>Selected: {selectedSize}</p>}
      </div>

      {/* Quantity Selector */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Quantity:</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => handleQuantityChange(-1)}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            −
          </button>
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              minWidth: "40px",
              textAlign: "center",
            }}
          >
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
        }}
      >
        ADD TO CART
      </button>

      {/* Cart Status Display */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <p>
          Current cart items: <strong>{cartCount}</strong>
        </p>
        <button
          onClick={() => navigate("/cart")}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#fff",
            border: "1px solid #000",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View Cart
        </button>
      </div>

      {/* Integration Tips */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#e3f2fd",
          borderRadius: "4px",
          fontSize: "0.9rem",
        }}
      >
        <h4>💡 Integration Tips:</h4>
        <ul>
          <li>
            Import <code>useCart</code> hook from context
          </li>
          <li>
            Call <code>addToCart()</code> with product details
          </li>
          <li>
            Use <code>getCartCount()</code> to show cart badge
          </li>
          <li>Navigate to '/cart' to view cart page</li>
          <li>Cart data persists in localStorage automatically</li>
        </ul>
      </div>
    </div>
  );
};

export default ExampleProductPage;

/**
 * USAGE IN YOUR APP:
 *
 * 1. Add route in App.tsx:
 *    <Route path="/example" element={<ExampleProductPage />} />
 *
 * 2. Adapt this code to your existing product component
 *
 * 3. Replace inline styles with your SCSS modules
 *
 * 4. Use your actual product data structure
 *
 * 5. Customize the UI to match your design
 */
