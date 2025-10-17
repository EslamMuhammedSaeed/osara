import React, { useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";

// Mock Data
const productData = {
  id: 1,
  name: "Floating Phone",
  price: 1650.0,
  currency: "EGP",
  rating: 5,
  reviews: 5,
  description: `Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis.

Magna ert si amet purus gravid a quisiit turpis.Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis. Magna ert si amet purus gravid a quisiit turpis.Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis.`,
  images: [
    "https://via.placeholder.com/600x600/E5E7EB/9CA3AF?text=Product+Image+1",
    "https://via.placeholder.com/600x600/D1D5DB/6B7280?text=Product+Image+2",
    "https://via.placeholder.com/600x600/E5E7EB/9CA3AF?text=Product+Image+3",
    "https://via.placeholder.com/600x600/D1D5DB/6B7280?text=Product+Image+4",
  ],
  colors: [
    { name: "Gray", value: "#94A3B8" },
    { name: "Black", value: "#1E293B" },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  freeShippingThreshold: 199,
};

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

// Star Rating Component
const StarRating: React.FC<{ rating: number; reviews: number }> = ({
  rating,
  reviews,
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">{stars}</div>
      <span className="text-sm text-gray-600 ml-1">{reviews} Reviews</span>
    </div>
  );
};

// Product Gallery Component
const ProductGallery: React.FC<{
  images: string[];
  productName: string;
}> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageChange = (index: number) => {
    if (index !== selectedImage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedImage(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-400 ${
              selectedImage === index
                ? "border-gray-800 ring-2 ring-gray-300"
                : "border-gray-200"
            }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={images[selectedImage]}
          alt={productName}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};

// Product Info Component
const ProductInfo: React.FC<{ product: typeof productData }> = ({
  product,
}) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          {product.name}
        </h1>
        <p className="text-3xl font-bold text-gray-900 mt-3">
          {product.price.toFixed(2)} {product.currency}
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30
        consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra
        nam justo. Magna ert si amet purus gravid a quisiit turpis.
      </p>

      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Color</span>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                selectedColor === index
                  ? "border-gray-800 ring-2 ring-gray-300"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">
            Size Options
          </span>
          <button className="text-sm text-gray-500 underline hover:text-gray-700">
            Find My Size?
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
                selectedSize === size
                  ? "border-gray-800 bg-gray-800 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity and Actions */}
      <div>
        <span className="text-sm font-medium text-gray-700 block mb-3">
          QTY
        </span>
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              <FaMinus className="text-xs text-gray-600" />
            </button>
            <span className="px-6 py-2 border-x border-gray-300 min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              <FaPlus className="text-xs text-gray-600" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200">
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Buy It Now Button */}
      <button className="w-full border-2 border-gray-900 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200">
        BUY IT NOW
      </button>

      {/* Payment & Security */}
      <div className="border border-gray-200 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Guarantee Safe & Secure Checkout
        </p>
        <div className="flex gap-2 flex-wrap">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="Mastercard"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
            className="h-6"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 text-sm">
        <p className="text-gray-600">
          Quisque no s erci.
          <span className="font-medium text-gray-900"> Quisque no s erci.</span>
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-900">
            Free Shipping & Return:
          </span>{" "}
          On all orders over ${product.freeShippingThreshold}
        </p>
      </div>
    </div>
  );
};

// Product Description Component
const ProductDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === "description"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
            {activeTab === "description" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("size-guide")}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === "size-guide"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Size guide
            {activeTab === "size-guide" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "description" ? (
          <div className="text-gray-600 text-sm leading-relaxed max-w-4xl">
            {description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-sm leading-relaxed">
            <p>Size guide information would go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    currency: string;
    image: string;
  };
}> = ({ product }) => {
  return (
    <div className="group cursor-pointer flex-shrink-0 w-64">
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-gray-900">
          {product.price.toFixed(2)} {product.currency}
        </span>
        <span className="text-sm text-gray-400 line-through">
          {product.originalPrice.toFixed(2)} {product.currency}
        </span>
      </div>
    </div>
  );
};

// Product Recommendations Component
const ProductRecommendations: React.FC<{
  relatedProducts: typeof relatedProducts;
  recentlyViewed: typeof recentlyViewedProducts;
}> = ({ relatedProducts, recentlyViewed }) => {
  return (
    <div className="mt-16 space-y-12">
      {/* You may also like */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          You may also like...
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Recently Viewed Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Recently Viewed Products
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {recentlyViewed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Why Email Section Component
const WhyEmailSection: React.FC = () => {
  const features = [
    {
      icon: <TbTruckDelivery className="text-4xl" />,
      title: "Free Shipping & Return",
      description: "Free shipping for all orders over $130",
    },
    {
      icon: <RiCustomerService2Line className="text-4xl" />,
      title: "Customer Support 24/7",
      description: "Instant access to perfect support everyday",
    },
    {
      icon: <BsShieldCheck className="text-4xl" />,
      title: "100% Secure Payment",
      description: "We ensure secure payment for customers",
    },
  ];

  return (
    <div className="mt-16 py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
        Why Emall?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-gray-900 mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Product Details Page Component
const ProductDetailsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hover:text-gray-900 cursor-pointer">Home Page</span>
          <span>/</span>
          <span className="hover:text-gray-900 cursor-pointer">MAIN</span>
          <span>/</span>
          <span className="hover:text-gray-900 cursor-pointer">Apparel</span>
          <span>/</span>
          <span className="hover:text-gray-900 cursor-pointer">Mens</span>
          <span>/</span>
          <span className="text-gray-900">
            Default-MR.Los Angeles Letters Standard T/S Sleeve
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <ProductGallery
            images={productData.images}
            productName={productData.name}
          />
          <ProductInfo product={productData} />
        </div>

        {/* Product Description */}
        <ProductDescription description={productData.description} />

        {/* Product Recommendations */}
        <ProductRecommendations
          relatedProducts={relatedProducts}
          recentlyViewed={recentlyViewedProducts}
        />

        {/* Why Email Section */}
        <WhyEmailSection />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
