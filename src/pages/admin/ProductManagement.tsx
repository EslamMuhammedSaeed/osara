import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProducts,
  deleteProduct,
  setFilters,
} from "@/store/slices/productsSlice";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";
import ProductModal from "@/components/admin/ProductModal";
import styles from "./ProductManagement.module.scss";

const ProductManagement = () => {
  const dispatch = useAppDispatch();
  const { products, pagination, filters, loading } = useAppSelector(
    (state) => state.products
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    loadProducts();
  }, [filters]);
  useEffect(() => {
    console.log("products", products);
  }, [products]);

  const loadProducts = () => {
    const queryFilters = {
      ...filters,
      search: searchQuery || undefined,
    };
    dispatch(fetchProducts(queryFilters));
  };

  const handleSearch = () => {
    dispatch(setFilters({ page: 1, search: searchQuery }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setFilters({ page }));
  };

  const handleAddProduct = () => {
    setSelectedProductId(null);
    setModalOpen(true);
  };

  const handleEditProduct = (productId: number) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      await dispatch(deleteProduct(productId));
    }
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
    <div className={styles.productManagement}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>إدارة المنتجات</h1>
          <p className={styles.pageSubtitle}>إدارة جميع منتجات المتجر</p>
        </div>
        <button className={styles.addButton} onClick={handleAddProduct}>
          <FiPlus />
          إضافة منتج جديد
        </button>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="البحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>
            <FiSearch />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.productsContainer}>
        {loading ? (
          <div className={styles.loading}>جاري التحميل...</div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <FiPackage className={styles.emptyIcon} />
            <p>لا توجد منتجات</p>
            <button className={styles.emptyButton} onClick={handleAddProduct}>
              إضافة منتج جديد
            </button>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${
                          product.images[0]
                        }`}
                        alt={product.name}
                      />
                    ) : (
                      <div className={styles.noImage}>
                        <FiPackage />
                      </div>
                    )}
                    {product.stock < 10 && (
                      <span className={styles.lowStock}>مخزون منخفض</span>
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productCategory}>{product.category}</p>
                    <div className={styles.productMeta}>
                      <div className={styles.productPrice}>
                        <span className={styles.price}>
                          EGP {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className={styles.originalPrice}>
                            EGP {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className={styles.productStock}>
                        المخزون: {product.stock}
                      </span>
                    </div>
                    <div className={styles.productActions}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <FiEdit2 />
                        تعديل
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <FiTrash2 />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            عرض {(pagination.page - 1) * pagination.limit + 1} -{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} من{" "}
            {pagination.total}
          </div>
          <div className={styles.paginationButtons}>{renderPagination()}</div>
        </div>
      )}

      {/* Product Modal */}
      {modalOpen && (
        <ProductModal
          productId={selectedProductId}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductManagement;
