import { useAppSelector } from "@/store/hooks";
import { FiUsers, FiMail, FiCalendar } from "react-icons/fi";
import styles from "./AdminManagement.module.scss";

const AdminManagement = () => {
  const { admin } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.adminManagement}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>المشرفون</h1>
        <p className={styles.pageSubtitle}>إدارة حسابات المشرفين</p>
      </div>

      <div className={styles.adminCard}>
        <div className={styles.cardHeader}>
          <div className={styles.adminAvatar}>
            <FiUsers />
          </div>
          <div className={styles.adminInfo}>
            <h2 className={styles.adminName}>المشرف الحالي</h2>
            <span className={styles.adminRole}>مدير النظام</span>
          </div>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              <FiMail />
              البريد الإلكتروني
            </div>
            <div className={styles.infoValue}>
              {admin?.email || "غير متوفر"}
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              <FiCalendar />
              تاريخ التسجيل
            </div>
            <div className={styles.infoValue}>
              {admin?.createdAt
                ? new Date(admin.createdAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "غير متوفر"}
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              <FiCalendar />
              آخر تحديث
            </div>
            <div className={styles.infoValue}>
              {admin?.updatedAt
                ? new Date(admin.updatedAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "غير متوفر"}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#f0f4ff", color: "#667eea" }}
          >
            <FiUsers />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statTitle}>إجمالي المشرفين</p>
            <h3 className={styles.statValue}>1</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#d4f4dd", color: "#48bb78" }}
          >
            <FiUsers />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statTitle}>المشرفون النشطون</p>
            <h3 className={styles.statValue}>1</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
