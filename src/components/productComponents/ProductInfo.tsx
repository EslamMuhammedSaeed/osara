import { useState } from "react";
import type { ProductData } from "./types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { StarRating } from "./StarRating";
import { useCart } from "@context/CartContext";
import { useNavigate } from "react-router-dom";
import Modal from "@components/Modal/Modal";

// All available sizes in the store
const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];

export const ProductInfo: React.FC<{ product: ProductData }> = ({
  product,
}) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "warning" | "info" | "error",
    onConfirm: undefined as (() => void) | undefined,
  });
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Check which sizes are available
  const isSizeAvailable = (size: string) => product.sizes.includes(size);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setModalConfig({
        title: "المقاس مطلوب",
        message: "يرجى تحديد المقاس قبل إضافة المنتج إلى السلة.",
        type: "warning",
        onConfirm: undefined,
      });
      setShowModal(true);
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

    // Show success message with option to go to cart
    setModalConfig({
      title: "تم إضافة المنتج إلى السلة!",
      message: `${product.name} تم إضافته إلى السلة. هل تريد عرض السلة؟`,
      type: "success",
      onConfirm: () => navigate("/cart"),
    });
    setShowModal(true);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={modalConfig.onConfirm ? "عرض السلة" : "موافق"}
        cancelText="استمرار التسوق"
        onConfirm={modalConfig.onConfirm}
      />
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
          {product.description}
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
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === index
                    ? "border-gray-800 ring-2 ring-gray-300 ring-offset-1"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{
                  background: color.secondValue
                    ? `linear-gradient(135deg, ${color.value} 0%, ${color.value} 50%, ${color.secondValue} 50%, ${color.secondValue} 100%)`
                    : color.value,
                }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
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
            {ALL_SIZES.map((size) => {
              const isAvailable = isSizeAvailable(size);
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  onClick={() => isAvailable && setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={`relative px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "border-gray-800 bg-gray-800 text-white"
                      : isAvailable
                      ? "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
                      : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                  }`}
                  aria-label={`Size ${size} ${
                    !isAvailable ? "(Out of stock)" : ""
                  }`}
                >
                  <span className={!isAvailable ? "" : ""}>{size}</span>
                  {!isAvailable && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="absolute w-full h-0.5 bg-red-400 transform rotate-[-25deg]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {/* <p className="text-xs text-gray-500 mt-2">
            <span className="line-through text-gray-400">XX</span> = Out of
            stock
          </p> */}
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
            <span className="font-medium text-gray-900">
              الشحن والإرجاع مجانًا:
            </span>{" "}
            على جميع الطلبات التي تزيد عن 1000 جنيه
          </p>
        </div>
      </div>
    </>
  );
};
