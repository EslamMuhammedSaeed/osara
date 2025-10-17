import ProductDetailsPage from "./components/ProductDetailsPage";

/**
 * ProductDetailsDemo - Standalone demo of the Product Details Page
 *
 * This is a demo page that showcases the fully-featured product details component.
 *
 * To view this page:
 * 1. Update src/main.tsx to import and render this component instead of App
 * 2. Or set up routing to display this component at a specific route
 *
 * Features included:
 * - Interactive image gallery with thumbnail selection
 * - Color and size selection
 * - Quantity selector with increment/decrement
 * - Add to Cart and Buy Now buttons
 * - Product description with tabs
 * - Related products carousel
 * - Recently viewed products section
 * - Features section (shipping, support, payment)
 * - Fully responsive design with Tailwind CSS
 * - Smooth transitions and hover effects
 */
function ProductDetailsDemo() {
  return (
    <div className="bg-gray-50">
      <ProductDetailsPage />
    </div>
  );
}

export default ProductDetailsDemo;
