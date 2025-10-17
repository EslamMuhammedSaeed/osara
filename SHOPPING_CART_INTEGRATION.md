# Shopping Cart Integration Guide

This guide shows how to integrate and use the Shopping Cart system in your React + TypeScript application.

## 📁 Project Structure

```
src/
  context/
    CartContext.tsx              # Cart state management & localStorage
  components/
    Cart/
      CartPage.tsx              # Main cart page component
      CartPage.module.scss      # Cart page styles
      CartItem.tsx              # Individual cart item component
      CartItem.module.scss      # Cart item styles
      CartSummary.tsx           # Cart summary sidebar
      CartSummary.module.scss   # Cart summary styles
      ProductCard.tsx           # Product card for recommendations
      ProductCard.module.scss   # Product card styles
```

## 🚀 Getting Started

### 1. Wrap Your App with CartProvider

The `CartProvider` must wrap your entire application to make cart functionality available everywhere:

```tsx
// src/App.tsx
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "@components/Cart/CartPage";

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
```

### 2. Using Cart Functions in Components

Import the `useCart` hook to access cart functionality:

```tsx
import { useCart } from "../../context/CartContext";

function ProductPage() {
  const { addToCart, getCartCount } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      color: "Black",
      size: "M",
    });
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

## 🛒 Cart Context API

### Available Functions

```typescript
interface CartContextType {
  cartItems: CartItem[]; // Current items in cart
  addToCart: (item) => void; // Add item to cart
  removeFromCart: (id) => void; // Remove item from cart
  updateQuantity: (id, qty) => void; // Update item quantity
  clearCart: () => void; // Clear all items
  getCartTotal: () => number; // Get cart total price
  getCartCount: () => number; // Get total item count
}
```

### CartItem Interface

```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string; // Optional
  size?: string; // Optional
}
```

## 💡 Usage Examples

### Example 1: Add to Cart Button

```tsx
import { useCart } from "../../context/CartContext";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
    });

    alert("Added to cart!");
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
};
```

### Example 2: Cart Icon with Badge

```tsx
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav>
      <Link to="/cart">
        🛒 Cart
        {cartCount > 0 && <span>({cartCount})</span>}
      </Link>
    </nav>
  );
};
```

### Example 3: Update Quantity

```tsx
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div>
      <button onClick={handleDecrease}>-</button>
      <span>{item.quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};
```

### Example 4: Display Cart Total

```tsx
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const { getCartTotal } = useCart();
  const total = getCartTotal();

  return (
    <div>
      <h3>Cart Total</h3>
      <p>${total.toFixed(2)}</p>
    </div>
  );
};
```

### Example 5: Remove Item

```tsx
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  const handleRemove = () => {
    if (confirm("Remove this item?")) {
      removeFromCart(item.id);
    }
  };

  return <button onClick={handleRemove}>Remove</button>;
};
```

### Example 6: Clear Cart

```tsx
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { clearCart } = useCart();

  const handleClearCart = () => {
    if (confirm("Empty your cart?")) {
      clearCart();
    }
  };

  return <button onClick={handleClearCart}>Empty Cart</button>;
};
```

## 💾 LocalStorage Persistence

The cart automatically saves to `localStorage` with the key `'shopping-cart'`.

- **Auto-save**: Cart updates are automatically saved
- **Auto-load**: Cart is loaded when the app starts
- **Persistent**: Cart survives page refreshes and browser restarts

### Manual Access (if needed)

```typescript
// Get cart data
const cartData = localStorage.getItem("shopping-cart");
const cart = JSON.parse(cartData);

// Clear cart manually
localStorage.removeItem("shopping-cart");
```

## 🎨 Styling

All components use SCSS modules for scoped styling:

```tsx
import styles from "./CartItem.module.scss";

<div className={styles.cartItem}>
  <img className={styles.productImage} />
  <span className={styles.price} />
</div>;
```

### Key Style Variables

You can customize colors by updating the SCSS files:

```scss
// Primary colors
$text-dark: #222;
$text-light: #777;
$border-color: #e5e5e5;
$bg-light: #f5f5f5;

// Accent colors
$danger: #dc3545;
$primary: #222;
```

## 🔄 Cart Page Features

### Current Features

✅ Display all cart items  
✅ Update quantity (+/-)  
✅ Remove individual items  
✅ Empty entire cart  
✅ Apply coupon (UI only)  
✅ Shipping options (radio buttons)  
✅ Calculate shipping  
✅ Cart summary with totals  
✅ Product recommendations  
✅ Breadcrumb navigation  
✅ Empty cart state  
✅ Responsive design

### Future Enhancements

- Backend coupon validation
- Real shipping calculation
- Checkout integration
- Wishlist/save for later
- Product variant changes in cart

## 🚦 Testing

Visit these routes to test the cart:

1. **Home Page**: `/` - Browse products
2. **Product Page**: `/product/:id` - Add items to cart
3. **Cart Page**: `/cart` - View and manage cart

## 📱 Responsive Design

The cart page is fully responsive:

- **Desktop**: Side-by-side layout (cart | summary)
- **Tablet**: Stacked layout with full-width summary
- **Mobile**: Single column, optimized touch targets

## 🎯 Key Points

1. **Always use `useCart()` hook** - Never access localStorage directly
2. **Cart persists automatically** - No manual save needed
3. **Unique item IDs** - Items are identified by `id` field only
4. **Quantity validation** - Minimum quantity is 1
5. **Type safety** - Full TypeScript support

## 🆘 Troubleshooting

### Cart not persisting?

Check browser localStorage is enabled and not full.

### Items duplicating?

Ensure product IDs are unique and consistent.

### Hook error?

Make sure `CartProvider` wraps your app component.

### Styles not applying?

Verify SCSS module imports are correct.

---

**Need Help?** Check the source code in `src/context/CartContext.tsx` for implementation details.

