import React, { useEffect } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  type?: "success" | "warning" | "info" | "error";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  type = "info",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "warning":
        return "⚠";
      case "error":
        return "✕";
      default:
        return "ℹ";
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={`${styles.icon} ${styles[type]}`}>{getIcon()}</div>

        <h2 id="modal-title" className={styles.title}>
          {title}
        </h2>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          {onConfirm ? (
            <>
              <button
                className={styles.cancelBtn}
                onClick={onClose}
                aria-label="Cancel"
              >
                {cancelText}
              </button>
              <button
                className={styles.confirmBtn}
                onClick={handleConfirm}
                aria-label="Confirm"
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              className={styles.confirmBtn}
              onClick={onClose}
              aria-label="Close"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
