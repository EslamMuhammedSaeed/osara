import styles from "./ProductSection.module.scss";
import ProductCard from "./ProductCard";

interface Product {
  // id: number;
  // image: string;
  // title: string;
  // price: number;
  // originalPrice?: number;
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  colors: string[] | string[][]; // Support both single colors and gradients
  sizes: string[];
  images: string[];
  category: string;
  subCategory: string;
  material?: string;
  style?: string;
  fit?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
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
              image={`${import.meta.env.VITE_API_URL}${product.images[0]}`}
              title={product.name}
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
