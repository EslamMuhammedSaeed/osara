import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiCheckCircle, FiPackage, FiHome } from "react-icons/fi";
import styles from "./OrderSuccess.module.scss";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // If no order info, redirect to home
    if (!orderNumber && !orderId) {
      navigate("/");
    }
  }, [orderNumber, orderId, navigate]);

  return (
    <div className={styles.successPage}>
      <div className={styles.container}>
        <div className={styles.successCard}>
          {/* Success Icon */}
          <div className={styles.iconWrapper}>
            <FiCheckCircle className={styles.successIcon} />
          </div>

          {/* Success Message */}
          <h1 className={styles.title}>تم إنشاء طلبك بنجاح! 🎉</h1>
          <p className={styles.subtitle}>
            شكراً لك على طلبك. سنتواصل معك قريباً لتأكيد التفاصيل.
          </p>

          {/* Order Info */}
          <div className={styles.orderInfo}>
            <div className={styles.infoItem}>
              <FiPackage className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>رقم الطلب</span>
                <span className={styles.infoValue}>
                  #{orderNumber || orderId || "---"}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className={styles.nextSteps}>
            <h3 className={styles.nextStepsTitle}>ماذا بعد؟</h3>
            <ul className={styles.stepsList}>
              <li>✅ سيتم مراجعة طلبك من قبل فريقنا</li>
              <li>📞 سنتواصل معك خلال 24 ساعة للتأكيد</li>
              <li>📦 سيتم تحضير طلبك وشحنه في أقرب وقت</li>
              <li>🚚 ستتلقى إشعاراً عند شحن طلبك</li>
            </ul>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/")}
            >
              <FiHome />
              العودة للرئيسية
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => navigate("/")}
            >
              متابعة التسوق
            </button>
          </div>

          {/* Help Text */}
          <p className={styles.helpText}>
            في حال وجود أي استفسار، يمكنك التواصل معنا عبر البريد الإلكتروني أو
            الهاتف
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
