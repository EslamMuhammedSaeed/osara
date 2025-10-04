import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import ImageGallery from "./components/ImageGallary/ImageGallery";
import Tagline from "./components/Tagline/Tagline";
import ProductSection from "./components/ProductSection/ProductSection";
import Footer from "./components/Footer/Footer";
import product1 from "@assets/product_1.jpeg";
import product2 from "@assets/product_2.jpeg";
import product3 from "@assets/product_3.jpeg";

function App() {
  // Sample product data for "OUR PRODUCT" section
  const ourProducts = [
    {
      id: 1,
      image: product1,
      title: "المنتج الأول",
      price: 1300.0,
      originalPrice: 1800.0,
    },
    {
      id: 2,
      image: product2,
      title: "المنتج الثاني",
      price: 1300.0,
      originalPrice: 1800.0,
    },
    {
      id: 3,
      image: product3,
      title: "المنتج الثالث",
      price: 1300.0,
      originalPrice: 1800.0,
    },
    // {
    //   id: 4,
    //   image: "/images/products/product-4.jpg",
    //   title: "Printed With T-Shirt",
    //   price: 1300.0,
    //   originalPrice: 1800.0,
    // },
  ];

  // Sample product data for "You may also like..." section
  // const relatedProducts = [
  //   {
  //     id: 5,
  //     image: "/images/products/product-5.jpg",
  //     title: "Printed With T-Shirt",
  //     price: 1300.0,
  //     originalPrice: 1800.0,
  //   },
  //   {
  //     id: 6,
  //     image: "/images/products/product-6.jpg",
  //     title: "Printed With T-Shirt",
  //     price: 1300.0,
  //     originalPrice: 1800.0,
  //   },
  //   {
  //     id: 7,
  //     image: "/images/products/product-7.jpg",
  //     title: "Printed With T-Shirt",
  //     price: 1300.0,
  //     originalPrice: 1800.0,
  //   },
  //   {
  //     id: 8,
  //     image: "/images/products/product-8.jpg",
  //     title: "Printed With T-Shirt",
  //     price: 1300.0,
  //     originalPrice: 1800.0,
  //   },
  // ];

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
      <ProductSection title="منتجاتنا" products={ourProducts} />

      {/* You may also like Section */}
      {/* <ProductSection title="You may also like..." products={relatedProducts} /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
