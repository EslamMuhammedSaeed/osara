import React from "react";
import { useCart, type CartItem as CartItemType } from "@context/CartContext";
import styles from "./CartItem.module.scss";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.product}>
        <img src={item.image} alt={item.name} className={styles.productImage} />
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{item.name}</h3>
          {item.color && <p className={styles.variant}>Color: {item.color}</p>}
          {item.size && <p className={styles.variant}>Size: {item.size}</p>}
        </div>
      </div>

      <div className={styles.price}>EGP {item.price.toFixed(2)}</div>

      <div className={styles.quantity}>
        <button
          className={styles.quantityBtn}
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          −
        </button>
        <span className={styles.quantityValue}>{item.quantity}</span>
        <button
          className={styles.quantityBtn}
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </button>
      </div>

      <div className={styles.subtotal}>EGP {subtotal.toFixed(2)}</div>

      <button
        className={styles.removeBtn}
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
