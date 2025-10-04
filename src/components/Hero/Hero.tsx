import heroMain from "@assets/hero_main.png";
import heroText from "@assets/hero_text.svg";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] mt-16">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed `}
        style={{
          backgroundImage: `url(${heroMain})`,
        }}
      >
        {/* Gradient Overlay - fade to white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
      </div>

      {/* Arabic Text Overlay */}
      <div className={styles.heroTextContainer}>
        <h1 className={styles.heroTextMain}>مرحبا بك في</h1>
        <img src={heroText} alt="Hero Text" className={styles.heroText} />
        {/* <h1
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white drop-shadow-lg"
          style={{ fontFamily: "serif" }}
        >
          مجموعة نساء
        </h1> */}
      </div>
    </section>
  );
};

export default Hero;
