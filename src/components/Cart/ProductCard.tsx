import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100
      )
    : 0;

  return (
    <Link to={`/product/${product.id}`} className={styles.productCard}>
      <div className={styles.imageWrapper}>
        {hasDiscount && (
          <div className={styles.badges}>
            <span className={styles.badge}>-{discountPercent}%</span>
          </div>
        )}
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className={styles.originalPrice}>
              ${product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

