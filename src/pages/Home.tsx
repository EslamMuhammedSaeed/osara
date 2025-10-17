import Navbar from "@components/Navbar/Navbar";
import Hero from "@components/Hero/Hero";
import ImageGallery from "@components/ImageGallary/ImageGallery";
import Tagline from "@components/Tagline/Tagline";
import ProductSection from "@components/ProductSection/ProductSection";
import Footer from "@components/Footer/Footer";
import { ourProducts } from "@utils/consts";

export default function Home() {
  const ourProductsList = ourProducts;
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
      <ProductSection title="منتجاتنا" products={ourProductsList} />

      {/* You may also like Section */}
      {/* <ProductSection title="You may also like..." products={relatedProducts} /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
