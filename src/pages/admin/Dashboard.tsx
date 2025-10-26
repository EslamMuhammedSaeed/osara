import { useEffect, useState } from "react";
import { adminAPI } from "@/services/api";
import type { DashboardStats } from "@/types/admin.types";
import {
  FiShoppingCart,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      id: "total-orders",
      title: "إجمالي الطلبات",
      value: stats?.totalOrders || 0,
      icon: <FiShoppingCart />,
      color: "#667eea",
      bgColor: "#f0f4ff",
    },
    {
      id: "pending-orders",
      title: "الطلبات المعلقة",
      value: stats?.pendingOrders || 0,
      icon: <FiClock />,
      color: "#f6ad55",
      bgColor: "#fffaf0",
    },
    {
      id: "total-revenue",
      title: "إجمالي الإيرادات",
      value: `$${stats?.totalRevenue?.toFixed(2) || "0.00"}`,
      icon: <FiDollarSign />,
      color: "#48bb78",
      bgColor: "#f0fff4",
    },
    {
      id: "total-profit",
      title: "إجمالي الأرباح",
      value: `$${stats?.totalProfit?.toFixed(2) || "0.00"}`,
      icon: <FiTrendingUp />,
      color: "#9f7aea",
      bgColor: "#faf5ff",
    },
  ];

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>لوحة التحكم</h1>
        </div>
        <div className={styles.loading}>جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>لوحة التحكم</h1>
        <p className={styles.pageSubtitle}>نظرة عامة على إحصائيات المتجر</p>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((card) => (
          <div key={card.id} className={styles.statCard}>
            <div
              className={styles.statIcon}
              style={{ backgroundColor: card.bgColor, color: card.color }}
            >
              {card.icon}
            </div>
            <div className={styles.statContent}>
              <p className={styles.statTitle}>{card.title}</p>
              <h2 className={styles.statValue}>{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {stats?.recentOrders && stats.recentOrders.length > 0 && (
        <div className={styles.recentOrders}>
          <h2 className={styles.sectionTitle}>أحدث الطلبات</h2>
          <div className={styles.ordersTable}>
            <table>
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>العميل</th>
                  <th>الإجمالي</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.orderNumber}</td>
                    <td>{order.name}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[order.status]
                        }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    processing: "قيد التنفيذ",
    picked: "تم التحضير",
    shipped: "تم الشحن",
    delivered: "تم التسليم",
    cancelled: "ملغي",
  };
  return labels[status] || status;
};

export default Dashboard;
