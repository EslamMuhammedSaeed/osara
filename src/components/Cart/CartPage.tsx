import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import ProductCard from "./ProductCard";
import styles from "./CartPage.module.scss";
import { ourProducts } from "@utils/consts";

const CartPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      alert(`Coupon "${couponCode}" applied! (Demo only)`);
    }
  };

  const handleEmptyCart = () => {
    if (window.confirm("Are you sure you want to empty your cart?")) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartContent}>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className={styles.shopBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link> &gt; <span>Shopping Cart</span>
        </div>

        {/* Page Title */}
        <h1 className={styles.pageTitle}>Shopping Cart</h1>

        {/* Main Cart Section */}
        <div className={styles.cartLayout}>
          {/* Left Side - Cart Items */}
          <div className={styles.cartMain}>
            {/* Cart Header */}
            <div className={styles.cartHeader}>
              <div className={styles.headerProduct}>Product</div>
              <div className={styles.headerPrice}>Price</div>
              <div className={styles.headerQuantity}>Quantity</div>
              <div className={styles.headerSubtotal}>Subtotal</div>
              <div className={styles.headerRemove}></div>
            </div>

            {/* Cart Items */}
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Cart Actions */}
            <div className={styles.cartActions}>
              <div className={styles.couponSection}>
                <input
                  type="text"
                  placeholder="Coupon code"
                  className={styles.couponInput}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className={styles.applyBtn} onClick={handleApplyCoupon}>
                  APPLY COUPON
                </button>
              </div>

              <button className={styles.emptyCartBtn} onClick={handleEmptyCart}>
                ⚠ EMPTY CART
              </button>
            </div>
          </div>

          {/* Right Side - Cart Summary */}
          <div className={styles.cartSidebar}>
            <CartSummary />
          </div>
        </div>

        {/* You may be interested in... */}
        <div className={styles.recommendations}>
          <h2 className={styles.recommendationsTitle}>
            You may be interested in...
          </h2>
          <div className={styles.recommendationsGrid}>
            {ourProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
