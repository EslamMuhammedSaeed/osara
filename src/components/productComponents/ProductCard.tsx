export const ProductCard: React.FC<{
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
