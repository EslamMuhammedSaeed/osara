import { FaFacebook, FaPinterest, FaInstagram } from "react-icons/fa6";
import styles from "./Footer.module.scss";
import icon from "@assets/icon.svg";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="flex justify-between items-center gap-8 mb-8">
          {/* Social Media & Description */}
          <div>
            <h3 className={styles.sectionTitle}>تابعنا</h3>
            {/* Social Icons */}
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.facebook.com/share/14TFUgy1yh7/?mibextid=wwXIfr"
                target="_blank"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterest className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/osara.brand?igsh=d3V6Z2x6MGo0MTA0"
                target="_blank"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
            <p className={styles.description}>
              وجهتك للموضة العصرية. اكتشف الجديد أول بأول وتسوق بسهولة.
            </p>
          </div>
          <div className={styles.iconContainer}>
            <img src={icon} alt="icon" className={styles.icon} />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-end items-center gap-4">
            {/* Payment Methods */}
            {/* <div className="flex items-center gap-2 flex-wrap">
              <div className="w-10 h-6 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-white">
                VISA
              </div>
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-white">
                MC
              </div>
              <div className="w-10 h-6 bg-gray-400 rounded flex items-center justify-center text-xs font-bold text-white">
                AE
              </div>
              <div className="w-10 h-6 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-700">
                PP
              </div>
              <div className="w-10 h-6 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-700">
                GPay
              </div>
            </div> */}

            {/* Copyright */}
            <p className=" text-xs text-gray-500" dir="ltr">
              All rights reserved © {new Date().getFullYear()} Osara.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
