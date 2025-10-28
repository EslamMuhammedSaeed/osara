import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import logo from "@assets/logo.svg";
import logoIcon from "@assets/icon.svg";
import {
  FiHome,
  FiShoppingCart,
  FiTag,
  FiUsers,
  // FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import styles from "./AdminLayout.module.scss";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { admin } = useAppSelector((state) => state.auth);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      path: "/admin/dashboard",
      icon: <FiHome />,
    },
    {
      id: "orders",
      label: "إدارة الطلبات",
      path: "/admin/orders",
      icon: <FiShoppingCart />,
    },
    {
      id: "products",
      label: "المنتجات",
      path: "/admin/products",
      icon: <FiTag />,
    },
    {
      id: "admins",
      label: "المشرفون",
      path: "/admin/admins",
      icon: <FiUsers />,
    },
    // {
    //   id: "reports",
    //   label: "التقارير",
    //   path: "/admin/reports",
    //   icon: <FiBarChart2 />,
    // },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.adminLayout} dir="rtl">
      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          sidebarCollapsed ? styles.collapsed : ""
        } ${mobileMenuOpen ? styles.mobileOpen : ""}`}
      >
        <div
          className={`${styles.sidebarHeader} ${
            sidebarCollapsed ? styles.collapsed : ""
          }`}
        >
          <div className={styles.logo}>
            {!sidebarCollapsed && (
              <img src={logo} alt="logo" className={styles.logo} />
            )}
            {sidebarCollapsed && (
              <img
                src={logoIcon}
                width={30}
                height={30}
                alt="logo"
                className={styles.logoIcon}
              />
            )}
          </div>
          <button
            className={styles.toggleButton}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FiMenu />
          </button>
        </div>

        <nav className={styles.menu}>
          <p className={styles.menuTitle}>
            {!sidebarCollapsed && "القائمة الرئيسية"}
          </p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.menuItem} ${
                isActive(item.path) ? styles.active : ""
              }`}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              title={sidebarCollapsed ? item.label : ""}
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              {!sidebarCollapsed && (
                <span className={styles.menuLabel}>{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            title={sidebarCollapsed ? "تسجيل الخروج" : ""}
          >
            <span className={styles.menuIcon}>
              <FiLogOut />
            </span>
            {!sidebarCollapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Top Bar */}
        <header className={styles.topBar}>
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className={styles.topBarLeft}>
            <div className={styles.adminInfo}>
              <span className={styles.adminName}>{admin?.email || "مشرف"}</span>
              <span className={styles.adminRole}>مدير النظام</span>
            </div>
            <div className={styles.adminAvatar}>
              {admin?.email?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
