import styles from "./ImageGallery.module.scss";
import gallery1 from "@assets/carousal_2_1.jpeg";
import gallery2 from "@assets/carousal_2_2.jpeg";
import gallery3 from "@assets/carousal_2_3.jpeg";
import gallery4 from "@assets/carousal_2_4.jpeg";
import gallery5 from "@assets/carousal_2_5.jpeg";

const ImageGallery = () => {
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5];

  return (
    <section className="py-8 md:py-12">
      <div className={styles.carouselContainer}>
        {/* Gallery Grid */}
        <div className={styles.galleryContainer}>
          {galleryImages.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className={styles.galleryContainer}>
          {galleryImages.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
