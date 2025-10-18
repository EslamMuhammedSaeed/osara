import React, { useState } from "react";
import { useCart } from "@context/CartContext";
import Modal from "@components/Modal/Modal";
import ShippingForm from "./ShippingForm";
import styles from "./CartSummary.module.scss";

const CartSummary: React.FC = () => {
  const { getCartTotal } = useCart();
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  const subtotal = getCartTotal();
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleShippingFeeChange = (fee: number) => {
    setShippingFee(fee);
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
          <span className={styles.value}>{subtotal.toFixed(2)} جنيه</span>
        </div>

        <ShippingForm onShippingFeeChange={handleShippingFeeChange} />

        {shippingFee > 0 && (
          <div className={styles.summaryRow}>
            <span className={styles.label}>رسوم الشحن</span>
            <span className={styles.value}>{shippingFee.toFixed(2)} جنيه</span>
          </div>
        )}

        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span className={styles.label}>المجموع الكلي</span>
          <span className={styles.value}>{total.toFixed(2)} جنيه</span>
        </div>

        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          متابعة الدفع
        </button>
      </div>
    </>
  );
};

export default CartSummary;
