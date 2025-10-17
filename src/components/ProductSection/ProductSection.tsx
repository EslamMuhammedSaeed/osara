import styles from "./ProductSection.module.scss";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection = ({ title, products }: ProductSectionProps) => {
  return (
    <section className={`${styles.productsSection}`}>
      <div>
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>{title}</h2>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
