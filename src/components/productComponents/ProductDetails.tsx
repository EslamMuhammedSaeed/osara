import React from "react";

import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import type { ProductData } from "./types";
import { ProductDescription } from "./ProductDescription";
import { ProductRecommendations } from "./ProductRecommendations";
import BreadCrumb from "@components/BreadCrumb.tsx/BreadCrumb";
import Navbar from "@components/Navbar/Navbar";

import Footer from "@components/Footer/Footer";

const relatedProducts = [
  {
    id: 2,
    name: "Printed With T-Shirt",
    price: 1300.0,
    originalPrice: 1650.0,
    currency: "EGP",
    image: "https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Product+1",
  },
  {
    id: 3,
    name: "Printed With T-Shirt",
    price: 1300.0,
    originalPrice: 1650.0,
    currency: "EGP",
    image: "https://via.placeholder.com/300x400/D1D5DB/6B7280?text=Product+2",
  },
  {
    id: 4,
    name: "Printed With T-Shirt",
    price: 1300.0,
    originalPrice: 1650.0,
    currency: "EGP",
    image: "https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Product+3",
  },
  {
    id: 5,
    name: "Printed With T-Shirt",
    price: 1300.0,
    originalPrice: 1650.0,
    currency: "EGP",
    image: "https://via.placeholder.com/300x400/D1D5DB/6B7280?text=Product+4",
  },
];

const recentlyViewedProducts = [
  {
    id: 6,
    name: "Printed With T-Shirt",
    price: 1300.0,
    originalPrice: 1650.0,
    currency: "EGP",
    image: "https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Recent+1",
  },
  {
    id: 7,
    name: "Printed With T-Shirt",
    price: 1300.0,
    originalPrice: 1650.0,
    currency: "EGP",
    image: "https://via.placeholder.com/300x400/D1D5DB/6B7280?text=Recent+2",
  },
  {
    id: 8,
    name: "Printed With T-Shirt",
    price: 1300.0,
    originalPrice: 1650.0,
    currency: "EGP",
    image: "https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Recent+3",
  },
  {
    id: 9,
    name: "Printed With T-Shirt",
    price: 1300.0,
    originalPrice: 1650.0,
    currency: "EGP",
    image: "https://via.placeholder.com/300x400/D1D5DB/6B7280?text=Recent+4",
  },
];

const ProductDetails: React.FC<{ product: ProductData }> = ({ product }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Breadcrumb */}
      <BreadCrumb
        breadcrumbs={[
          {
            name: "الصفحة الرئيسية",
            href: "/",
          },
          {
            name: product.name,
            href: `/product-details/${product.id}`,
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* Product Description */}
        <ProductDescription description={product.description} />

        {/* Product Recommendations */}
        <ProductRecommendations
          relatedProducts={relatedProducts}
          recentlyViewed={recentlyViewedProducts}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
