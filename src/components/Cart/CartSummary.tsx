import React, { useState } from "react";
import { useCart } from "@context/CartContext";
import Modal from "@components/Modal/Modal";
import styles from "./CartSummary.module.scss";

const CartSummary: React.FC = () => {
  const { getCartTotal } = useCart();
  const [shippingOption, setShippingOption] = useState<"local" | "flat">(
    "local"
  );
  const [showModal, setShowModal] = useState(false);

  const subtotal = getCartTotal();
  const shipping = shippingOption === "local" ? 5.0 : 10.0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setShowModal(true);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="الدفع"
        message="Proceeding to checkout... This feature will be implemented soon with payment integration."
        type="info"
        confirmText="OK"
      />
      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span className={styles.label}>المجموع الجزئي</span>
          <span className={styles.value}>EGP {subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.shippingSection}>
          <h4 className={styles.shippingTitle}>الشحن</h4>

          <label className={styles.shippingOption}>
            <input
              type="radio"
              name="shipping"
              value="local"
              checked={shippingOption === "local"}
              onChange={() => setShippingOption("local")}
            />
            <div className={styles.optionDetails}>
              <span className={styles.optionName}>
                الاستلام المحلي: EGP 5.00
              </span>
            </div>
          </label>

          <label className={styles.shippingOption}>
            <input
              type="radio"
              name="shipping"
              value="flat"
              checked={shippingOption === "flat"}
              onChange={() => setShippingOption("flat")}
            />
            <div className={styles.optionDetails}>
              <span className={styles.optionName}>Flat rate: $10.00</span>
            </div>
          </label>

          <p className={styles.shippingNote}>
            يتم تحديث خيارات الشحن أثناء الدفع.
          </p>
        </div>

        <div className={styles.calculateShipping}>
          <button className={styles.calculateBtn}>حساب الشحن</button>
        </div>

        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span className={styles.label}>المجموع</span>
          <span className={styles.value}>EGP {total.toFixed(2)}</span>
        </div>

        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          متابعة الدفع
        </button>
      </div>
    </>
  );
};

export default CartSummary;
