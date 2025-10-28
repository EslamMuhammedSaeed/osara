import styles from "./ProductDetailsSkeleton.module.scss";
import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb Skeleton */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumbSkeleton}>
          <div className={styles.shimmer}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Gallery Skeleton */}
          <div className={styles.gallerySection}>
            {/* Thumbnails */}
            <div className={styles.thumbnails}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.thumbnail}>
                  <div className={styles.shimmer}></div>
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className={styles.mainImage}>
              <div className={styles.shimmer}></div>
            </div>
          </div>

          {/* Info Skeleton */}
          <div className={styles.infoSection}>
            {/* Title */}
            <div className={styles.titleSkeleton}>
              <div className={styles.shimmer}></div>
            </div>

            {/* Price */}
            <div className={styles.priceSkeleton}>
              <div className={styles.shimmer}></div>
            </div>

            {/* Description */}
            <div className={styles.descriptionSkeleton}>
              <div className={styles.descLine}>
                <div className={styles.shimmer}></div>
              </div>
              <div className={styles.descLine}>
                <div className={styles.shimmer}></div>
              </div>
              <div className={`${styles.descLine} ${styles.short}`}>
                <div className={styles.shimmer}></div>
              </div>
            </div>

            {/* Color Selection */}
            <div className={styles.selectionGroup}>
              <div className={styles.label}>
                <div className={styles.shimmer}></div>
              </div>
              <div className={styles.colorOptions}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={styles.colorCircle}>
                    <div className={styles.shimmer}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className={styles.selectionGroup}>
              <div className={styles.label}>
                <div className={styles.shimmer}></div>
              </div>
              <div className={styles.sizeOptions}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={styles.sizeBox}>
                    <div className={styles.shimmer}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className={styles.actionsGroup}>
              <div className={styles.quantitySkeleton}>
                <div className={styles.shimmer}></div>
              </div>
              <div className={styles.addToCartSkeleton}>
                <div className={styles.shimmer}></div>
              </div>
            </div>

            {/* Additional Info */}
            <div className={styles.additionalInfo}>
              <div className={styles.shimmer}></div>
            </div>
          </div>
        </div>

        {/* Description Section Skeleton */}
        <div className={styles.descriptionSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.shimmer}></div>
          </div>
          <div className={styles.descriptionContent}>
            <div className={styles.descContentLine}>
              <div className={styles.shimmer}></div>
            </div>
            <div className={styles.descContentLine}>
              <div className={styles.shimmer}></div>
            </div>
            <div className={styles.descContentLine}>
              <div className={styles.shimmer}></div>
            </div>
            <div className={`${styles.descContentLine} ${styles.short}`}>
              <div className={styles.shimmer}></div>
            </div>
          </div>
        </div>

        {/* Recommendations Skeleton */}
        <div className={styles.recommendationsSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.shimmer}></div>
          </div>
          <div className={styles.productsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.productCardSkeleton}>
                <div className={styles.productImage}>
                  <div className={styles.shimmer}></div>
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productTitle}>
                    <div className={styles.shimmer}></div>
                  </div>
                  <div className={styles.productPrice}>
                    <div className={styles.shimmer}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailsSkeleton;
