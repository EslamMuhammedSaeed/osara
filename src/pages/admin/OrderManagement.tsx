import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchOrders,
  setFilters,
  updateOrderStatus,
  deleteOrder,
} from "@/store/slices/ordersSlice";
import type { OrderStatus } from "@/types/admin.types";
import {
  FiSearch,
  FiChevronDown,
  FiMoreVertical,
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import styles from "./OrderManagement.module.scss";

const OrderManagement = () => {
  const dispatch = useAppDispatch();
  const { orders, pagination, filters, loading } = useAppSelector(
    (state) => state.orders
  );
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, [filters]);

  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);

  const loadOrders = () => {
    const queryFilters = {
      ...filters,
      status: activeTab !== "all" ? activeTab : undefined,
      search: searchQuery || undefined,
    };
    dispatch(fetchOrders(queryFilters));
  };

  const handleTabChange = (tab: OrderStatus | "all") => {
    setActiveTab(tab);
    dispatch(setFilters({ page: 1, status: tab !== "all" ? tab : undefined }));
  };

  const handleSearch = () => {
    dispatch(setFilters({ page: 1, search: searchQuery }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setFilters({ page }));
  };

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    await dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    setDropdownOpen(null);
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      await dispatch(deleteOrder(orderId));
    }
    setDropdownOpen(null);
  };

  const tabs: { id: OrderStatus | "all"; label: string }[] = [
    { id: "pending", label: "قيد الانتظار" },
    { id: "confirmed", label: "مؤكد" },
    { id: "processing", label: "قيد التنفيذ" },
    { id: "picked", label: "تم التحضير" },
    { id: "shipped", label: "تم الشحن" },
    { id: "delivered", label: "تم التسليم" },
    { id: "cancelled", label: "ملغي" },
  ];

  const statusOptions: { value: OrderStatus; label: string }[] = [
    { value: "pending", label: "قيد الانتظار" },
    { value: "confirmed", label: "مؤكد" },
    { value: "processing", label: "قيد التنفيذ" },
    { value: "picked", label: "تم التحضير" },
    { value: "shipped", label: "تم الشحن" },
    { value: "delivered", label: "تم التسليم" },
    { value: "cancelled", label: "ملغي" },
  ];

  const getStatusLabel = (status: OrderStatus) => {
    return statusOptions.find((opt) => opt.value === status)?.label || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "الآن";
    if (diffInMinutes < 60) return `${diffInMinutes} دقيقة`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ساعة`;
    return date.toLocaleDateString("ar-EG");
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      pagination.page - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    // Previous button
    pages.push(
      <button
        key="prev"
        className={styles.pageButton}
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
      >
        ❮
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${
            i === pagination.page ? styles.active : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={styles.pageButton}
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.totalPages}
      >
        ❯
      </button>
    );

    return pages;
  };

  return (
    <div className={styles.orderManagement}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>إدارة الطلبات</h1>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="البحث برقم الطلب"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>
            <FiSearch />
          </button>
        </div>

        <button className={styles.filterButton}>
          تصفية حسب التاريخ
          <FiChevronDown />
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>جاري التحميل...</div>
        ) : orders.length === 0 ? (
          <div className={styles.emptyState}>
            <p>لا توجد طلبات</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>التاريخ</th>
                <th>العناصر</th>
                <th>العميل</th>
                <th>الإجمالي</th>
                <th>الربح</th>
                <th>الحالة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) &&
                orders.length > 0 &&
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className={styles.orderNumber}>
                      #{order.orderNumber || order.id}
                    </td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{order.items?.length || 0}</td>
                    <td>{order.name}</td>
                    <td>${order.total?.toFixed(2) || "0.00"}</td>
                    <td>
                      <span className={styles.profit}>
                        ${order.profit?.toFixed(2) || "0.00"}
                        <span className={styles.profitPercent}>16%</span>
                      </span>
                    </td>
                    <td>
                      <button
                        className={`${styles.statusBadge} ${
                          styles[order.status]
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownOpen(
                            dropdownOpen === order.id ? null : order.id
                          );
                        }}
                      >
                        {getStatusLabel(order.status)}
                        <FiChevronDown />
                      </button>
                      {dropdownOpen === order.id && (
                        <div className={styles.statusDropdown}>
                          {statusOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() =>
                                handleStatusChange(order.id, option.value)
                              }
                              className={
                                order.status === option.value
                                  ? styles.active
                                  : ""
                              }
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        className={styles.actionButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownOpen(
                            dropdownOpen === -order.id ? null : -order.id
                          );
                        }}
                      >
                        <FiMoreVertical />
                      </button>
                      {dropdownOpen === -order.id && (
                        <div className={styles.actionDropdown}>
                          <button>
                            <FiEye />
                            عرض التفاصيل
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className={styles.deleteButton}
                          >
                            <FiTrash2 />
                            حذف
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && orders.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            عرض{" "}
            <select
              value={pagination.limit}
              onChange={(e) =>
                dispatch(setFilters({ limit: Number(e.target.value), page: 1 }))
              }
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>{" "}
            من {pagination.total}
          </div>
          <div className={styles.paginationButtons}>{renderPagination()}</div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
