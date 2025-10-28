# Skeleton Loader Implementation

## Overview

Implemented beautiful, animated skeleton loaders for the landing page (Home) and product details page to provide a smooth user experience while data is being loaded from the backend.

---

## 📁 New Files Created

### 1. **src/components/skeletons/ProductCardSkeleton.tsx**

A skeleton component that mimics the appearance of a product card in the grid layout.

**Features:**

- Animated shimmer effect
- Matches the dimensions and layout of actual ProductCard
- Shows skeleton for:
  - Product image (400px height)
  - Product title
  - Price (main + original)
  - "Buy Now" button

**Usage:**

```tsx
import ProductCardSkeleton from "@components/skeletons/ProductCardSkeleton";

// Render multiple skeletons
{
  [...Array(8)].map((_, index) => <ProductCardSkeleton key={index} />);
}
```

### 2. **src/components/skeletons/ProductCardSkeleton.module.scss**

SCSS module with smooth shimmer animations and responsive styling.

**Key Features:**

- `@keyframes shimmer` for smooth animation
- Gradient background that animates from left to right
- Responsive design (adjusts image height on mobile)
- Subtle hover effects

### 3. **src/components/skeletons/ProductDetailsSkeleton.tsx**

A comprehensive skeleton component for the entire product details page.

**Features:**
Shows skeleton placeholders for:

- Breadcrumb navigation
- Gallery section:
  - 4 thumbnail images
  - Main large image
- Product info section:
  - Title
  - Price
  - Description (3 lines)
  - Color selection (4 color circles)
  - Size selection (5 size boxes)
  - Quantity selector
  - Add to cart button
  - Additional info
- Product description section
- Recommendations section (4 product cards)
- Full Navbar and Footer integration

**Usage:**

```tsx
import ProductDetailsSkeleton from "@components/skeletons/ProductDetailsSkeleton";

// Show while loading
if (loading || !product) {
  return <ProductDetailsSkeleton />;
}
```

### 4. **src/components/skeletons/ProductDetailsSkeleton.module.scss**

Extensive SCSS module with skeleton styles for all product detail components.

**Key Features:**

- Consistent shimmer animation across all elements
- Responsive layout (stacks thumbnails horizontally on mobile)
- Matches exact dimensions of real components
- Smooth transitions

---

## 📝 Modified Files

### 1. **src/pages/Home.tsx**

**Changes:**

- Added `loading` state from Redux store
- Imported `ProductCardSkeleton` component
- Conditionally renders 8 skeleton cards while loading
- Shows actual products once loaded

**Before:**

```tsx
<ProductSection title="منتجاتنا" products={products} />
```

**After:**

```tsx
{
  loading ? (
    <section className={`${styles.productsSection}`}>
      <div>
        <h2 className={styles.sectionTitle}>منتجاتنا</h2>
        <div className={styles.productsGrid}>
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  ) : (
    <ProductSection title="منتجاتنا" products={products} />
  );
}
```

### 2. **src/pages/Product.tsx**

**Changes:**

- Added `loading` state from Redux store
- Imported `ProductDetailsSkeleton` component
- Shows skeleton while loading or if product not found
- Prevents rendering incomplete/null product data

**Before:**

```tsx
return (
  <div className="bg-gray-50">
    <ProductDetails product={product as ProductData} />
  </div>
);
```

**After:**

```tsx
// Show skeleton while loading or if product not found yet
if (loading || !product) {
  return <ProductDetailsSkeleton />;
}

return (
  <div className="bg-gray-50">
    <ProductDetails product={product as ProductData} />
  </div>
);
```

### 3. **src/components/productComponents/ProductInfo.tsx**

**Fixed:**

- Removed unused `StarRating` import
- Added helper function `getColorValue()` to handle string | string[] colors
- Fixed `.name` property access error (colors are now just color codes)

**Added:**

```tsx
const getColorValue = (color: string | string[]): string => {
  return typeof color === "string" ? color : color[0];
};
```

### 4. **src/utils/consts.ts**

**Fixed:**

- Removed old fields: `currency`, `rating`, `reviews`, `freeShippingThreshold`
- Added new required fields: `category`, `subCategory`, `material`, `style`, `fit`, `stock`, `createdAt`, `updatedAt`
- Converted colors from object format `{ name, value }` to array format:
  - Single colors: `"#000000"`
  - Gradients: `["#800020", "#94A3B8"]`

**Before:**

```tsx
colors: [
  { name: "Black", value: "#000000" },
  { name: "Purple", value: "#800080" },
];
```

**After:**

```tsx
colors: [
  "#000000", // Black
  "#800080", // Purple
];
```

---

## 🎨 Animation Details

### Shimmer Effect

The shimmer animation creates a smooth, professional loading effect:

```scss
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}
```

**Key Points:**

- 1.5-second animation duration
- Infinite loop
- Smooth gradient sweep from left to right
- Semi-transparent white overlay (60% opacity)
- Gray background (#f0f0f0) for skeleton elements

---

## 📱 Responsive Design

### Mobile Adjustments

Both skeleton components are fully responsive:

**ProductCardSkeleton:**

```scss
@media (max-width: 768px) {
  .skeletonImage {
    height: 300px; // Reduced from 400px
  }
}
```

**ProductDetailsSkeleton:**

```scss
@media (max-width: 1024px) {
  .gallerySection {
    flex-direction: column-reverse; // Stack vertically
  }

  .thumbnails {
    flex-direction: row; // Horizontal scroll
    overflow-x: auto;
  }
}

@media (max-width: 768px) {
  .mainImage {
    height: 350px; // Reduced from 600px
  }

  .productsGrid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
```

---

## ⚡ Performance Benefits

### Why Skeleton Loaders?

1. **Perceived Performance**: Users feel the page loads faster
2. **No Layout Shift**: Content area is reserved, preventing CLS
3. **Better UX**: Users know content is coming
4. **Professional Look**: Modern, polished loading state
5. **Accessibility**: Clear loading indication

### Loading States

The implementation uses Redux state to determine loading:

```tsx
const { products, loading } = useAppSelector((state) => state.products);

// loading is true during API calls
// loading is false when data is ready
```

---

## 🔧 Technical Details

### Component Architecture

```
src/
├── components/
│   └── skeletons/
│       ├── ProductCardSkeleton.tsx         (Component)
│       ├── ProductCardSkeleton.module.scss (Styles)
│       ├── ProductDetailsSkeleton.tsx      (Component)
│       └── ProductDetailsSkeleton.module.scss (Styles)
├── pages/
│   ├── Home.tsx                            (Uses ProductCardSkeleton)
│   └── Product.tsx                         (Uses ProductDetailsSkeleton)
```

### State Management

Both components rely on Redux state:

```tsx
// Redux store provides loading state
interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  pagination: {...};
  filters: {...};
  loading: boolean;  // ← Controls skeleton visibility
  error: string | null;
}
```

---

## 🎯 User Experience Flow

### Landing Page (Home.tsx)

1. User navigates to home page
2. `useEffect` triggers `fetchProducts()` dispatch
3. Redux sets `loading: true`
4. 8 skeleton cards render in grid layout
5. API responds with products
6. Redux sets `loading: false`
7. Skeleton cards are replaced with real product cards

**Loading Time:** Skeleton shows during API call (typically 1-3 seconds)

### Product Details Page (Product.tsx)

1. User clicks on a product card
2. Page navigates to `/product/:id`
3. If products not loaded, dispatch `fetchProducts()`
4. Redux sets `loading: true` OR product is not found yet
5. Full skeleton page renders (gallery, info, description)
6. API responds with products
7. Product is found in Redux store
8. Skeleton is replaced with actual product details

**Loading Time:** Skeleton shows until product data is available

---

## 🐛 Bug Fixes Included

### 1. Type Safety Issues

**Problem:** `ProductInfo.tsx` was trying to access `.name` on string colors
**Solution:** Added helper function to extract color value

### 2. Data Type Mismatches

**Problem:** `consts.ts` had old object format for colors
**Solution:** Converted to new array format (strings and string arrays)

### 3. Missing Required Fields

**Problem:** Mock data missing fields like `category`, `stock`, etc.
**Solution:** Added all required fields with appropriate values

### 4. React Hook Dependencies

**Problem:** `useEffect` missing dependencies in `Home.tsx` and `Product.tsx`
**Solution:** Added `dispatch` and `products` to dependency arrays

---

## 📊 Build Status

✅ **Build Successful** - No TypeScript errors  
✅ **No Linter Errors** - All type issues resolved  
✅ **All Components Working** - Skeleton loaders integrated  
✅ **Responsive Design** - Works on all screen sizes

### Build Output

```bash
vite v7.1.9 building for production...
✓ 210 modules transformed.
dist/assets/index-BA7ziRhi.css    84.15 kB │ gzip: 15.82 kB
dist/assets/index-BxHpKKn5.js    427.33 kB │ gzip: 131.31 kB
✓ built in 32.98s
```

---

## 🚀 How to Test

### Test Landing Page Skeleton

1. Clear browser cache
2. Navigate to home page (`/`)
3. Observe 8 animated skeleton cards
4. Wait for real products to load
5. Verify smooth transition

### Test Product Details Skeleton

1. Clear browser cache
2. Navigate to a product page (`/product/1`)
3. Observe full page skeleton with gallery, info, and recommendations
4. Wait for product data to load
5. Verify smooth transition

### Test on Mobile

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone, Galaxy, etc.)
4. Test both pages
5. Verify responsive layout

---

## 🎨 Design Highlights

### Visual Consistency

- Skeleton dimensions match real components exactly
- Colors use neutral gray palette (#f0f0f0, #e0e0e0)
- Border radius matches actual cards (12px, 8px, 6px)
- Spacing and padding identical to real layout

### Animation Quality

- Smooth 1.5s shimmer effect
- No janky animations
- Subtle and professional
- Not distracting or annoying

### Accessibility

- Maintains semantic HTML structure
- Preserves page layout
- Clear visual indication of loading state
- No flashing or rapid movements

---

## 💡 Future Enhancements

### Potential Improvements

1. **Staggered Animation**: Delay each skeleton card slightly for cascade effect
2. **Pulse Animation**: Alternative to shimmer for variety
3. **Content-Aware Skeletons**: Different skeletons for different product types
4. **Loading Progress**: Show percentage or progress bar
5. **Error State**: Special skeleton for failed loads
6. **Skeleton for Related Products**: Add skeleton to recommendation sections

---

## 📚 References

### Code Examples

**Using ProductCardSkeleton:**

```tsx
{
  loading ? (
    <div className={styles.productsGrid}>
      {[...Array(8)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  ) : (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

**Using ProductDetailsSkeleton:**

```tsx
if (loading || !product) {
  return <ProductDetailsSkeleton />;
}

return <ProductDetails product={product} />;
```

---

## ✅ Conclusion

The skeleton loader implementation provides:

- ✅ Smooth, professional loading experience
- ✅ Consistent with overall design system
- ✅ Fully responsive on all devices
- ✅ Type-safe and error-free
- ✅ Easy to maintain and extend
- ✅ Improves perceived performance
- ✅ Better user experience during data fetching

**Result:** A polished, production-ready skeleton loading system that enhances the user experience while products are being loaded from the backend API.
