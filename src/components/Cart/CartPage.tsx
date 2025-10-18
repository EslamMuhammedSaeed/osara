import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
// import ProductCard from "./ProductCard";
import Modal from "@components/Modal/Modal";
import styles from "./CartPage.module.scss";
// import { ourProducts } from "@utils/consts";
import Navbar from "@components/Navbar/Navbar";
import BreadCrumb from "@components/BreadCrumb.tsx/BreadCrumb";
import Footer from "@components/Footer/Footer";

const CartPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "warning" | "info" | "error",
    onConfirm: undefined as (() => void) | undefined,
  });

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setModalConfig({
        title: "Coupon Applied",
        message: `Coupon "${couponCode}" has been applied! (This is a demo - no actual discount applied)`,
        type: "success",
        onConfirm: undefined,
      });
      setShowModal(true);
      setCouponCode("");
    } else {
      setModalConfig({
        title: "Invalid Coupon",
        message: "Please enter a coupon code.",
        type: "warning",
        onConfirm: undefined,
      });
      setShowModal(true);
    }
  };

  const handleEmptyCart = () => {
    setModalConfig({
      title: "Empty Cart",
      message: "Are you sure you want to remove all items from your cart?",
      type: "warning",
      onConfirm: () => {
        clearCart();
      },
    });
    setShowModal(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartContent}>
          <h2>سلة المشتريات فارغة</h2>
          <p>أضف بعض المنتجات للبدء!</p>
          <Link to="/" className={styles.shopBtn}>
            استمرار التسوق
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={modalConfig.onConfirm ? "Yes, Empty Cart" : "OK"}
        cancelText="Cancel"
        onConfirm={modalConfig.onConfirm}
      />
      <div className={styles.cartPage}>
        <Navbar />
        {/* Breadcrumb */}
        <div className={styles.breadcrumbContainer}>
          <BreadCrumb
            breadcrumbs={[
              {
                name: "الصفحة الرئيسية",
                href: "/",
              },
              {
                name: "السلة",
                href: `/cart`,
              },
            ]}
          />
        </div>
        <div className={styles.container}>
          {/* Page Title */}
          <h1 className={styles.pageTitle}>سلة المشتريات</h1>

          {/* Main Cart Section */}
          <div className={styles.cartLayout}>
            {/* Left Side - Cart Items */}
            <div className={styles.cartMain}>
              {/* Cart Header */}
              <div className={styles.cartHeader}>
                <div className={styles.headerProduct}>المنتج</div>
                <div className={styles.headerPrice}>السعر</div>
                <div className={styles.headerQuantity}>الكمية</div>
                <div className={styles.headerSubtotal}>المجموع الجزئي</div>
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
                    placeholder="كود الخصم"
                    className={styles.couponInput}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className={styles.applyBtn}
                    onClick={handleApplyCoupon}
                  >
                    تطبيق الخصم
                  </button>
                </div>

                <button
                  className={styles.emptyCartBtn}
                  onClick={handleEmptyCart}
                >
                  ⚠ إفراغ السلة
                </button>
              </div>
            </div>

            {/* Right Side - Cart Summary */}
            <div className={styles.cartSidebar}>
              <CartSummary />
            </div>
          </div>

          {/* You may be interested in... */}
          {/* <div className={styles.recommendations}>
            <h2 className={styles.recommendationsTitle}>
              You may be interested in...
            </h2>
            <div className={styles.recommendationsGrid}>
              {ourProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
