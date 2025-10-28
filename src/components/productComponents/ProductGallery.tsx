import { useState } from "react";

export const ProductGallery: React.FC<{
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
        {images?.map((image, index) => (
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
              src={`${import.meta.env.VITE_API_URL}${image}`}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL}${images?.[selectedImage]}`}
          alt={productName}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};
