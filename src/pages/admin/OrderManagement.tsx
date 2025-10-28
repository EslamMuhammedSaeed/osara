import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchOrders,
  setFilters,
  updateOrderStatus,
  deleteOrder,
} from "@/store/slices/ordersSlice";
import type { OrderStatus, Order } from "@/types/admin.types";
import {
  FiSearch,
  FiChevronDown,
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiPackage,
  FiPhone,
  FiMapPin,
  FiX,
} from "react-icons/fi";
import OrderTableSkeleton from "@/components/admin/OrderTableSkeleton";
import styles from "./OrderManagement.module.scss";

const OrderManagement = () => {
  const dispatch = useAppDispatch();
  const { orders, pagination, filters, loading } = useAppSelector(
    (state) => state.orders
  );
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // useEffect(() => {
  //   console.log("orders", orders);
  // }, [orders]);

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

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} جنيه`;
  };

  const calculateProfit = (order: Order) => {
    const total = order.totalAmount || order.total || 0;
    const profit = order.profit || 0;
    const percentage = total > 0 ? ((profit / total) * 100).toFixed(1) : "0";
    return { profit, percentage };
  };

  const getTotalItems = (order: Order) => {
    return order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
    setDropdownOpen(null);
  };

  const renderColorPreview = (color: string[] | string) => {
    const colors = Array.isArray(color) ? color : [color];
    if (colors.length === 1) {
      return (
        <div
          className={styles.colorSingle}
          style={{ backgroundColor: colors[0] }}
        />
      );
    }
    return (
      <div
        className={styles.colorGradient}
        style={{
          background: `linear-gradient(135deg, ${colors.join(", ")})`,
        }}
      />
    );
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

        {/* <button className={styles.filterButton}>
          تصفية حسب التاريخ
          <FiChevronDown />
        </button> */}
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <OrderTableSkeleton />
        ) : orders.length === 0 ? (
          <div className={styles.emptyState}>
            <FiPackage size={48} />
            <p>لا توجد طلبات</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>التاريخ</th>
                  <th>العناصر</th>
                  <th>العميل</th>
                  <th>الإجمالي</th>
                  <th>الحالة</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orders) &&
                  orders.length > 0 &&
                  orders.map((order) => {
                    const { profit, percentage } = calculateProfit(order);
                    const totalAmount = order.totalAmount || order.total || 0;
                    const totalItems = getTotalItems(order);

                    return (
                      <tr key={order.id}>
                        <td className={styles.orderNumber}>
                          #{order.orderNumber || order.id}
                        </td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>
                          <div className={styles.itemsCell}>
                            <span className={styles.itemCount}>
                              {totalItems}
                            </span>
                            <span className={styles.itemText}>منتج</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.customerCell}>
                            <div className={styles.customerName}>
                              {order.name}
                            </div>
                            <div className={styles.customerLocation}>
                              {order.city}, {order.governorate}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.amountCell}>
                            <div className={styles.totalAmount}>
                              {formatCurrency(totalAmount)}
                            </div>
                            {order.shippingFee && order.shippingFee > 0 && (
                              <div className={styles.shippingFee}>
                                شحن: {formatCurrency(order.shippingFee)}
                              </div>
                            )}
                            {profit > 0 && (
                              <div className={styles.profitInfo}>
                                ربح: {formatCurrency(profit)}
                                <span className={styles.profitPercent}>
                                  {percentage}%
                                </span>
                              </div>
                            )}
                          </div>
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
                              <button onClick={() => handleViewDetails(order)}>
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
                    );
                  })}
              </tbody>
            </table>
          </div>
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

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowDetailsModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>
                تفاصيل الطلب #{selectedOrder.orderNumber || selectedOrder.id}
              </h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowDetailsModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Customer Information */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>معلومات العميل</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>الاسم:</span>
                    <span className={styles.infoValue}>
                      {selectedOrder.name}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>البريد:</span>
                    <span className={styles.infoValue}>
                      {selectedOrder.email}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <FiPhone size={14} />
                    <span className={styles.infoLabel}>الهاتف:</span>
                    <span className={styles.infoValue}>
                      {selectedOrder.phone}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <FiMapPin size={14} />
                    <span className={styles.infoLabel}>العنوان:</span>
                    <span className={styles.infoValue}>
                      {selectedOrder.address}, {selectedOrder.city},{" "}
                      {selectedOrder.governorate}
                    </span>
                  </div>
                  {selectedOrder.notes && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>ملاحظات:</span>
                      <span className={styles.infoValue}>
                        {selectedOrder.notes}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>المنتجات المطلوبة</h3>
                <div className={styles.orderItems}>
                  {selectedOrder.items?.map((item) => {
                    // Parse product images
                    let firstImage = "";
                    if (item.product?.images) {
                      try {
                        const images =
                          typeof item.product.images === "string"
                            ? JSON.parse(item.product.images)
                            : item.product.images;
                        firstImage = Array.isArray(images) ? images[0] : images;
                      } catch {
                        firstImage = item.product.images as unknown as string;
                      }
                    }

                    return (
                      <div key={item.id} className={styles.orderItem}>
                        {firstImage && (
                          <img
                            src={`${import.meta.env.VITE_API_URL}${firstImage}`}
                            alt={item.product?.name || "Product"}
                            className={styles.productImage}
                          />
                        )}
                        <div className={styles.itemDetails}>
                          <div className={styles.itemName}>
                            {item.product?.name || `Product #${item.productId}`}
                          </div>
                          <div className={styles.itemSpecs}>
                            <span>الكمية: {item.quantity}</span>
                            <span>المقاس: {item.size}</span>
                            <span className={styles.colorSpec}>
                              اللون: {renderColorPreview(item.color)}
                            </span>
                          </div>
                        </div>
                        <div className={styles.itemPrice}>
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>ملخص الطلب</h3>
                <div className={styles.orderSummary}>
                  <div className={styles.summaryRow}>
                    <span>المجموع الجزئي:</span>
                    <span>
                      {formatCurrency(
                        (selectedOrder.totalAmount ||
                          selectedOrder.total ||
                          0) - (selectedOrder.shippingFee || 0)
                      )}
                    </span>
                  </div>
                  {selectedOrder.shippingFee &&
                    selectedOrder.shippingFee > 0 && (
                      <div className={styles.summaryRow}>
                        <span>رسوم الشحن:</span>
                        <span>{formatCurrency(selectedOrder.shippingFee)}</span>
                      </div>
                    )}
                  <div className={`${styles.summaryRow} ${styles.total}`}>
                    <span>الإجمالي:</span>
                    <span>
                      {formatCurrency(
                        selectedOrder.totalAmount || selectedOrder.total || 0
                      )}
                    </span>
                  </div>
                  {selectedOrder.profit && selectedOrder.profit > 0 && (
                    <div className={`${styles.summaryRow} ${styles.profit}`}>
                      <span>الربح المتوقع:</span>
                      <span className={styles.profitAmount}>
                        {formatCurrency(selectedOrder.profit)}
                        <span className={styles.profitPercent}>
                          {calculateProfit(selectedOrder).percentage}%
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Status */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>حالة الطلب</h3>
                <div className={styles.statusSection}>
                  <span
                    className={`${styles.statusBadgeLarge} ${
                      styles[selectedOrder.status]
                    }`}
                  >
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                  <span className={styles.orderDate}>
                    {new Date(selectedOrder.createdAt).toLocaleString("ar-EG", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.secondaryButton}
                onClick={() => setShowDetailsModal(false)}
              >
                إغلاق
              </button>
              {/* <button
                className={styles.primaryButton}
                onClick={() => {
                  setShowDetailsModal(false);
                  setDropdownOpen(selectedOrder.id);
                }}
              >
                تغيير الحالة
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
