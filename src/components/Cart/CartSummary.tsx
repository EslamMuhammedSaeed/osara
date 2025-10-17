import React, { useState } from "react";
import { useCart } from "@context/CartContext";
import styles from "./CartSummary.module.scss";

const CartSummary: React.FC = () => {
  const { getCartTotal } = useCart();
  const [shippingOption, setShippingOption] = useState<"local" | "flat">(
    "local"
  );

  const subtotal = getCartTotal();
  const shipping = shippingOption === "local" ? 5.0 : 10.0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Here you would navigate to checkout page
  };

  return (
    <div className={styles.cartSummary}>
      <div className={styles.summaryRow}>
        <span className={styles.label}>Subtotal</span>
        <span className={styles.value}>${subtotal.toFixed(2)}</span>
      </div>

      <div className={styles.shippingSection}>
        <h4 className={styles.shippingTitle}>Shipping</h4>

        <label className={styles.shippingOption}>
          <input
            type="radio"
            name="shipping"
            value="local"
            checked={shippingOption === "local"}
            onChange={() => setShippingOption("local")}
          />
          <div className={styles.optionDetails}>
            <span className={styles.optionName}>Local pickup: $5.00</span>
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
          Shipping options will be updated during checkout.
        </p>
      </div>

      <div className={styles.calculateShipping}>
        <button className={styles.calculateBtn}>Calculate shipping</button>
      </div>

      <div className={`${styles.summaryRow} ${styles.total}`}>
        <span className={styles.label}>Total</span>
        <span className={styles.value}>${total.toFixed(2)}</span>
      </div>

      <button className={styles.checkoutBtn} onClick={handleCheckout}>
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
};

export default CartSummary;
