import { FaArrowLeftLong } from "react-icons/fa6";
import styles from "./BreadCrumb.module.scss";
import { Link } from "react-router-dom";
export const BreadCrumb: React.FC<{
  breadcrumbs: { name: string; href: string }[];
}> = ({ breadcrumbs }) => {
  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumb}>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className={styles.breadcrumbItem}>
            {index > 0 && (
              <span className="mx-2">
                <FaArrowLeftLong />
              </span>
            )}
            <Link className={styles.breadcrumbLink} to={breadcrumb.href}>
              {breadcrumb.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreadCrumb;
