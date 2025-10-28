import styles from "./ProductCardSkeleton.module.scss";

const ProductCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      {/* Image Skeleton */}
      <div className={styles.skeletonImage}>
        <div className={styles.shimmer}></div>
      </div>

      {/* Content Skeleton */}
      <div className={styles.skeletonContent}>
        {/* Title */}
        <div className={styles.skeletonTitle}>
          <div className={styles.shimmer}></div>
        </div>

        {/* Price */}
        <div className={styles.skeletonPrice}>
          <div className={styles.skeletonPriceMain}>
            <div className={styles.shimmer}></div>
          </div>
          <div className={styles.skeletonPriceOriginal}>
            <div className={styles.shimmer}></div>
          </div>
        </div>

        {/* Button */}
        <div className={styles.skeletonButton}>
          <div className={styles.shimmer}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
