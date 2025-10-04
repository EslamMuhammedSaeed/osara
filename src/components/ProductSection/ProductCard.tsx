import styles from "./ProductSection.module.scss";
interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
}

const ProductCard = ({
  image,
  title,
  price,
  originalPrice,
  currency = "EGP",
}: ProductCardProps) => {
  return (
    <div
      className={`${styles.productCard} bg-white   hover:shadow-xl transition-all duration-300 overflow-hidden`}
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
    </div>
  );
};

export default ProductCard;
