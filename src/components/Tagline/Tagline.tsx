import styles from "./Tagline.module.scss";
const Tagline = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Arabic Heading */}
        <h2 className={`${styles.taglineHeading} mb-4`}>
          أُسارا تكمل ما ينقصك
        </h2>

        {/* Arabic Description */}
        <p className={`${styles.taglineDescription} leading-relaxed`}>
          أناقة تعبّر عنك ،و زى يليق بك. أسارا تقدّم لك أزياء إسلامية عصرية تجمع
          بين الذوق، الراحة، والتميّز في كل تفصيلة.
        </p>
      </div>
    </section>
  );
};

export default Tagline;
