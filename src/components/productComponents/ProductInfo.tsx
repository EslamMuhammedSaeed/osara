import { useState } from "react";
import type { ProductData } from "./types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { StarRating } from "./StarRating";
import { useCart } from "@context/CartContext";
import { useNavigate } from "react-router-dom";

export const ProductInfo: React.FC<{ product: ProductData }> = ({
  product,
}) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      color: product.colors[selectedColor].name,
      size: selectedSize,
    });

    // Show success message
    if (window.confirm(`${product.name} added to cart!\n\nGo to cart?`)) {
      navigate("/cart");
    }
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
          <span className="text-sm font-medium text-gray-700">اللون</span>
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
          <span className="text-sm font-medium text-gray-700">المقاسات</span>
          {/* <button className="text-sm text-gray-500 underline hover:text-gray-700">
            Find My Size?
          </button> */}
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
          الكمية
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
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 cursor-pointer transition-colors duration-200"
          >
            إضافة إلى السلة
          </button>
        </div>
      </div>

      {/* Buy It Now Button */}
      {/* <button className="w-full border-2 border-gray-900 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200">
        BUY IT NOW
      </button> */}

      {/* Payment & Security */}
      {/* <div className="border border-gray-200 rounded-lg p-4">
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
      </div> */}

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
