import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext";
import Modal from "@components/Modal/Modal";
import ShippingForm, { type ShippingData } from "./ShippingForm";
import styles from "./CartSummary.module.scss";
import { createOrder } from "@/store/slices/ordersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { governs, cities } from "@utils/consts";

const CartSummary: React.FC = () => {
  const navigate = useNavigate();
  const { getCartTotal, cartItems, clearCart } = useCart();
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    type: "success" | "error" | "info";
    title: string;
    message: string;
  }>({
    type: "info",
    title: "",
    message: "",
  });
  const [shippingData, setShippingData] = useState<ShippingData>({
    name: "",
    email: "",
    phone: "",
    governorate: "",
    city: "",
    address: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.orders);

  const subtotal = getCartTotal();
  const total = subtotal + shippingFee;

  const validateForm = (): boolean => {
    if (!shippingData.name.trim()) {
      setModalConfig({
        type: "error",
        title: "خطأ في البيانات",
        message: "يرجى إدخال الاسم",
      });
      setShowModal(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!shippingData.email.trim() || !emailRegex.test(shippingData.email)) {
      setModalConfig({
        type: "error",
        title: "خطأ في البيانات",
        message: "يرجى إدخال بريد إلكتروني صحيح",
      });
      setShowModal(true);
      return false;
    }

    const phoneRegex = /^(10|11|12|15)\d{8}$/;
    if (!shippingData.phone.trim() || !phoneRegex.test(shippingData.phone)) {
      setModalConfig({
        type: "error",
        title: "خطأ في البيانات",
        message:
          "يرجى إدخال رقم هاتف صحيح (يبدأ بـ 10 أو 11 أو 12 أو 15 ويتكون من 10 أرقام)",
      });
      setShowModal(true);
      return false;
    }

    if (!shippingData.governorate) {
      setModalConfig({
        type: "error",
        title: "خطأ في البيانات",
        message: "يرجى اختيار المحافظة",
      });
      setShowModal(true);
      return false;
    }

    if (!shippingData.city) {
      setModalConfig({
        type: "error",
        title: "خطأ في البيانات",
        message: "يرجى اختيار المدينة",
      });
      setShowModal(true);
      return false;
    }

    if (!shippingData.address.trim()) {
      setModalConfig({
        type: "error",
        title: "خطأ في البيانات",
        message: "يرجى إدخال العنوان التفصيلي",
      });
      setShowModal(true);
      return false;
    }

    if (cartItems.length === 0) {
      setModalConfig({
        type: "error",
        title: "سلة التسوق فارغة",
        message: "يرجى إضافة منتجات إلى السلة قبل المتابعة",
      });
      setShowModal(true);
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Get governorate and city names
    const governorateName =
      governs.find((g) => g.id === shippingData.governorate)
        ?.governorate_name_ar || shippingData.governorate;
    const cityName =
      cities.find((c) => c.id === shippingData.city)?.city_name_ar ||
      shippingData.city;

    // Transform cart items to match API format
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size || "",
      color: item.color || [],
    }));

    const orderData = {
      items: orderItems,
      name: shippingData.name,
      email: shippingData.email,
      phone: `+20${shippingData.phone}`, // Add country code
      governorate: governorateName,
      city: cityName,
      address: shippingData.address,
      ...(shippingData.notes && { notes: shippingData.notes }),
    };

    try {
      const result = await dispatch(createOrder({ data: orderData })).unwrap();

      // Success! Clear cart and navigate to success page
      clearCart();

      // Navigate to success page with order info
      navigate(
        `/order-success?orderNumber=${result.orderNumber || ""}&orderId=${
          result.id || ""
        }`
      );
    } catch (error) {
      setModalConfig({
        type: "error",
        title: "فشل إنشاء الطلب",
        message:
          (error as string) ||
          "حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.",
      });
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShippingFeeChange = (fee: number) => {
    setShippingFee(fee);
  };

  const handleShippingDataChange = (data: ShippingData) => {
    setShippingData(data);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText="حسناً"
      />
      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span className={styles.label}>المجموع الجزئي</span>
          <span className={styles.value}>{subtotal.toFixed(2)} جنيه</span>
        </div>

        <ShippingForm
          onShippingFeeChange={handleShippingFeeChange}
          onFormDataChange={handleShippingDataChange}
        />

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

        <button
          className={styles.checkoutBtn}
          onClick={handleCheckout}
          disabled={isSubmitting || loading || cartItems.length === 0}
        >
          {isSubmitting || loading ? "جاري إنشاء الطلب..." : "إنشاء الطلب"}
        </button>
      </div>
    </>
  );
};

export default CartSummary;
