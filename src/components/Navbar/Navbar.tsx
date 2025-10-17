import logo from "@assets/logo.svg";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useCart } from "@context/CartContext";

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <a href="/" className="flex items-center">
            <img src={logo} alt="OSARA" />
          </a>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center">
          <Link to="/cart" className={styles.cartLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>
        </div>

        {/* Search Icon */}
        {/* <div className="flex items-center">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <FiSearch className="w-5 h-5 text-gray-700" />
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
