# 🛒 Shopping Cart System

A complete, production-ready shopping cart implementation for React + TypeScript using SCSS modules with localStorage persistence.

## ✨ Features

- ✅ Add/remove items to/from cart
- ✅ Update item quantities
- ✅ Persistent storage (localStorage)
- ✅ Cart summary with totals
- ✅ Shipping options
- ✅ Responsive design
- ✅ Product recommendations
- ✅ Empty cart state
- ✅ TypeScript support
- ✅ SCSS modules styling

## 📸 Screenshot

The cart page matches the clean e-commerce design provided, featuring:

- Left side: Cart items table with product image, name, price, quantity controls, and remove button
- Right side: Cart summary with subtotal, shipping options, and checkout button
- Bottom: "You may be interested in..." product recommendations

## 🚀 Quick Start

### 1. The app is already configured!

The `CartProvider` wraps your entire app in `src/App.tsx`:

```tsx
<CartProvider>
  <Router>
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      {/* other routes */}
    </Routes>
  </Router>
</CartProvider>
```

### 2. Use in any component:

```tsx
import { useCart } from "../../context/CartContext";

function ProductPage() {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: 1,
      name: "Black T-Shirt",
      price: 80.0,
      quantity: 1,
      image: "/path/to/image.jpg",
    });
  };

  return <button onClick={handleAdd}>Add to Cart</button>;
}
```

### 3. Access the cart page:

Navigate to `/cart` or click the cart icon in the navbar.

## 📁 File Structure

```
src/
├── context/
│   └── CartContext.tsx                 # State management + localStorage
├── components/
│   ├── Cart/
│   │   ├── CartPage.tsx               # Main cart page
│   │   ├── CartPage.module.scss       # Page styles
│   │   ├── CartItem.tsx               # Individual item
│   │   ├── CartItem.module.scss       # Item styles
│   │   ├── CartSummary.tsx            # Summary sidebar
│   │   ├── CartSummary.module.scss    # Summary styles
│   │   ├── ProductCard.tsx            # Recommendation cards
│   │   ├── ProductCard.module.scss    # Card styles
│   │   └── ExampleProductIntegration.tsx  # Example usage
│   └── Navbar/
│       └── Navbar.tsx                 # Includes cart icon with badge
└── App.tsx                            # CartProvider wrapper
```

## 🔧 API Reference

### `useCart()` Hook

```typescript
const {
  cartItems, // CartItem[] - All items in cart
  addToCart, // Add item to cart
  removeFromCart, // Remove item by id
  updateQuantity, // Update item quantity
  clearCart, // Empty cart
  getCartTotal, // Get total price
  getCartCount, // Get total item count
} = useCart();
```

### CartItem Type

```typescript
interface CartItem {
  id: number; // Unique product ID
  name: string; // Product name
  price: number; // Product price
  quantity: number; // Item quantity
  image: string; // Product image URL
  color?: string; // Optional color
  size?: string; // Optional size
}
```

## 💡 Common Use Cases

### Add to Cart

```tsx
addToCart({
  id: product.id,
  name: product.name,
  price: product.price,
  quantity: 1,
  image: product.images[0],
  color: "Black",
  size: "M",
});
```

### Show Cart Count Badge

```tsx
const { getCartCount } = useCart();
const count = getCartCount();

return <span>Cart ({count})</span>;
```

### Update Quantity

```tsx
const { updateQuantity } = useCart();

updateQuantity(itemId, newQuantity);
```

### Clear Cart

```tsx
const { clearCart } = useCart();

clearCart();
```

## 🎨 Styling

All components use SCSS modules for scoped, conflict-free styling:

```tsx
import styles from "./CartItem.module.scss";

<div className={styles.cartItem}>
  <img className={styles.productImage} />
</div>;
```

### Color Scheme

- **Text Dark**: `#222`
- **Text Light**: `#777`
- **Border**: `#e5e5e5`
- **Background**: `#f5f5f5`
- **Danger**: `#dc3545`

## 📱 Responsive

The cart is fully responsive:

- **Desktop** (>968px): Side-by-side layout
- **Tablet** (768px-968px): Stacked layout
- **Mobile** (<768px): Single column, touch-optimized

## 🔗 Integration Example

See the working integration in:

- **Product Page**: `src/components/productComponents/ProductInfo.tsx`
- **Navbar**: `src/components/Navbar/Navbar.tsx`
- **Example Component**: `src/components/Cart/ExampleProductIntegration.tsx`

## 📚 Documentation

For detailed integration instructions, see:

- `SHOPPING_CART_INTEGRATION.md` - Complete integration guide
- `src/components/Cart/ExampleProductIntegration.tsx` - Live code example

## ✅ Testing

1. **Add items**: Go to any product page and click "Add to Cart"
2. **View cart**: Click cart icon in navbar or navigate to `/cart`
3. **Update quantity**: Use +/- buttons in cart
4. **Remove items**: Click ✕ button on any item
5. **Empty cart**: Click "Empty Cart" button
6. **Refresh page**: Cart persists via localStorage

## 🚦 Routes

- `/` - Home page with products
- `/product/:id` - Product detail page with "Add to Cart"
- `/cart` - Shopping cart page

## 🎯 Features in Detail

### Cart Page

- Product image, name, and price
- Quantity controls (+/-)
- Individual subtotals
- Remove item button
- Coupon code input (UI only)
- Empty cart button
- Breadcrumb navigation

### Cart Summary

- Subtotal calculation
- Shipping options (radio buttons)
- Calculate shipping button
- Total amount
- Proceed to Checkout button

### Product Recommendations

- "You may be interested in..." section
- Displays related products
- Links to product pages

### Empty State

- Friendly message when cart is empty
- "Continue Shopping" button
- Returns to home page

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation
- **SCSS Modules** - Scoped styling
- **localStorage** - Data persistence
- **Context API** - State management

## 📝 Notes

- Cart data is stored in localStorage with key `shopping-cart`
- Items are uniquely identified by their `id`
- Minimum quantity is 1
- Removing item requires confirmation
- Clearing cart requires confirmation
- Cart automatically syncs across tabs/windows

## 🆘 Troubleshooting

**Cart not showing items?**

- Check that CartProvider wraps your app
- Verify localStorage is enabled
- Check browser console for errors

**Items not persisting?**

- Ensure localStorage is not full
- Check browser privacy settings
- Verify no localStorage blockers

**Hook error?**

- Make sure you're using useCart inside CartProvider
- Check import path is correct

## 🚀 Next Steps

To extend the cart system:

1. **Backend Integration**

   - Connect to API for cart sync
   - Save cart to user account
   - Validate coupon codes

2. **Checkout Flow**

   - Create checkout page
   - Add payment integration
   - Order confirmation

3. **Enhanced Features**
   - Save for later / wishlist
   - Product recommendations based on cart
   - Cart abandonment recovery
   - Multi-currency support

---

**Ready to use!** The cart system is fully functional and integrated into your app. Add products from any product page and view them in `/cart`.

For questions or customization, refer to the source code in `src/context/CartContext.tsx` and `src/components/Cart/`.

