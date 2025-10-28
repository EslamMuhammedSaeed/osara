import styles from "./OrderTableSkeleton.module.scss";

const OrderTableSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      {[...Array(5)].map((_, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.cell}>
            <div className={`${styles.shimmer} ${styles.orderNumber}`}></div>
          </div>
          <div className={styles.cell}>
            <div className={`${styles.shimmer} ${styles.date}`}></div>
          </div>
          <div className={styles.cell}>
            <div className={`${styles.shimmer} ${styles.items}`}></div>
          </div>
          <div className={styles.cell}>
            <div className={`${styles.shimmer} ${styles.customer}`}></div>
          </div>
          <div className={styles.cell}>
            <div className={`${styles.shimmer} ${styles.amount}`}></div>
          </div>
          <div className={styles.cell}>
            <div className={`${styles.shimmer} ${styles.status}`}></div>
          </div>
          <div className={styles.cell}>
            <div className={`${styles.shimmer} ${styles.actions}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTableSkeleton;
