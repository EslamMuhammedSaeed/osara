import React, { useEffect } from "react";
import { useCart, type CartItem as CartItemType } from "@context/CartContext";
import styles from "./CartItem.module.scss";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item, newQuantity);
    }
  };

  useEffect(() => {
    console.log("item", item);
  }, [item]);

  const subtotal = item.price * item.quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.product}>
        <img
          src={`${import.meta.env.VITE_API_URL}${item.image}`}
          alt={item.name}
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{item.name}</h3>
          {item.color && (
            <p className={`${styles.variant} ${styles.colorVariant}`}>
              اللون:{" "}
              <span
                // className={styles.colorValue}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 border-gray-300 hover:border-gray-400`}
                style={{
                  background:
                    item.color.length > 1
                      ? `linear-gradient(135deg, ${item.color[0]} 0%, ${item.color[0]} 50%, ${item.color[1]} 50%, ${item.color[1]} 100%)`
                      : item.color[0],
                }}
                // style={{ backgroundColor: item.color }}
              ></span>
            </p>
          )}
          {item.size && <p className={styles.variant}>المقاس: {item.size}</p>}
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
        onClick={() => removeFromCart(item)}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
