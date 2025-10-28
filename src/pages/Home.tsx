import Navbar from "@components/Navbar/Navbar";
import Hero from "@components/Hero/Hero";
import ImageGallery from "@components/ImageGallary/ImageGallery";
import Tagline from "@components/Tagline/Tagline";
import ProductSection from "@components/ProductSection/ProductSection";
import Footer from "@components/Footer/Footer";
import ProductCardSkeleton from "@components/skeletons/ProductCardSkeleton";
// import { ourProducts } from "@utils/consts";
import { fetchProducts } from "@/store/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import styles from "@components/ProductSection/ProductSection.module.scss";

export default function Home() {
  // const ourProductsList = ourProducts;
  const { products, loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Image Gallery */}
      <ImageGallery />

      {/* Tagline Section */}
      <Tagline />

      {/* Our Product Section */}
      {loading ? (
        <section className={`${styles.productsSection}`}>
          <div>
            <h2 className={styles.sectionTitle}>منتجاتنا</h2>
            <div className={styles.productsGrid}>
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <ProductSection title="منتجاتنا" products={products} />
      )}

      {/* You may also like Section */}
      {/* <ProductSection title="You may also like..." products={relatedProducts} /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
