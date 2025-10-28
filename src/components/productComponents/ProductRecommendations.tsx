// import { ourProducts } from "@utils/consts";
import type { ProductData } from "./types";
import styles from "./ProductDetails.module.scss";
import ProductCard from "@components/ProductSection/ProductCard";
import { useParams } from "react-router-dom";

export const ProductRecommendations: React.FC<{
  relatedProducts: ProductData[];
  // recentlyViewed: ProductCardData[];
}> = ({ relatedProducts }) => {
  // const ourProductsList = ourProducts;
  const { id } = useParams();

  return (
    <div className="mt-16 space-y-12">
      {/* You may also like */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          قد تعجبك هذه المنتجات أيضا
        </h2>
        {/* <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}

        <div className={styles.productsGrid}>
          {relatedProducts
            .filter((product) => product.id !== Number(id))
            .map((product) => (
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

      {/* Recently Viewed Products */}
      {/* <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Recently Viewed Products
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {recentlyViewed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div> */}
    </div>
  );
};
