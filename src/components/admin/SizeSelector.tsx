import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import styles from "./SizeSelector.module.scss";

interface SizeSelectorProps {
  selectedSizes: string[];
  onChange: (sizes: string[]) => void;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSizes,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      onChange(selectedSizes.filter((s) => s !== size));
    } else {
      onChange([...selectedSizes, size]);
    }
  };

  const removeSize = (size: string) => {
    onChange(selectedSizes.filter((s) => s !== size));
  };

  return (
    <div className={styles.sizeSelector} ref={dropdownRef}>
      <div className={styles.selectedSizes} onClick={() => setIsOpen(!isOpen)}>
        {selectedSizes.length === 0 ? (
          <span className={styles.placeholder}>اختر المقاسات</span>
        ) : (
          <div className={styles.sizeChips}>
            {selectedSizes.map((size) => (
              <span
                key={size}
                className={styles.sizeChip}
                onClick={(e) => {
                  e.stopPropagation();
                  removeSize(size);
                }}
              >
                {size}
                <FiX />
              </span>
            ))}
          </div>
        )}
        <FiChevronDown className={styles.chevron} />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {AVAILABLE_SIZES.map((size) => (
            <div
              key={size}
              className={`${styles.sizeOption} ${
                selectedSizes.includes(size) ? styles.selected : ""
              }`}
              onClick={() => toggleSize(size)}
            >
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => {}}
              />
              <span>{size}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
