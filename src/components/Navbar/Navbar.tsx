import logo from "@assets/logo.svg";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <a href="/" className="flex items-center">
            <img src={logo} alt="OSARA" />
          </a>
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
