import { useNavigate } from "react-router-dom";
import styles from "./ProductSection.module.scss";
interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  originalPrice,
  currency = "EGP",
}: ProductCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      className={`${styles.productCard} bg-white rounded-lg  hover:shadow-xl transition-all duration-300 overflow-hidden`}
    >
      {/* Product Image */}
      <div className={styles.productImage}>
        <img
          src={image}
          alt={title}
          className={`${styles.productImage}  group-hover:scale-105 transition-transform duration-500`}
        />
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        <h3 className={`${styles.productTitle} `}>{title}</h3>

        <div className={styles.productPrice}>
          <span className="text-lg font-semibold text-gray-900">
            {price.toFixed(2)} {currency}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {originalPrice.toFixed(2)} {currency}
            </span>
          )}
        </div>
      </div>
      <div className="w-full px-5 pb-4">
        <button
          onClick={handleClick}
          className="w-full block text-center bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 cursor-pointer transition-colors duration-200"
        >
          اشتري الآن
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
