import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createProduct,
  updateProduct,
  fetchProductById,
} from "@/store/slices/productsSlice";
import type { CreateProductData } from "@/types/admin.types";
import { FiX } from "react-icons/fi";
import SizeSelector from "./SizeSelector";
import ColorPicker from "./ColorPicker";
import ImageUploader from "./ImageUploader";
import styles from "./ProductModal.module.scss";

interface ProductModalProps {
  productId: number | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ productId, onClose }) => {
  const dispatch = useAppDispatch();
  const { currentProduct } = useAppSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateProductData>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    colors: [],
    sizes: [],
    images: [],
    category: "",
    subCategory: "",
    material: "",
    style: "",
    fit: "",
    stock: 0,
  });
  const [currentProductImages, setCurrentProductImages] = useState<string[]>(
    []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Convert colors from string[] to string[][] for backward compatibility
  const colorsAsArray = Array.isArray(formData.colors[0])
    ? (formData.colors as string[][])
    : (formData.colors as string[]).map((color) => [color]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (currentProduct && productId) {
      setFormData({
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        originalPrice: currentProduct.originalPrice || 0,
        colors: currentProduct.colors,
        sizes: currentProduct.sizes,
        images: [],
        category: currentProduct.category,
        subCategory: currentProduct.subCategory,
        material: currentProduct.material || "",
        style: currentProduct.style || "",
        fit: currentProduct.fit || "",
        stock: currentProduct.stock,
      });
      setCurrentProductImages(currentProduct.images.map((image) => `${image}`));
    }
  }, [currentProduct, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    // console.log("handleSubmit", e);
    if (!validateForm()) return;
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      return;
    }
    console.log("errors", errors);
    setLoading(true);

    try {
      if (productId) {
        await dispatch(
          updateProduct({
            id: productId,
            data: { ...formData, currentProductImages: currentProductImages },
          })
        );
      } else {
        await dispatch(createProduct(formData));
      }
      onClose();
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setLoading(false);
    }
  };

  // const validateInputs = () => {
  //   const emailError = validateEmail(adminDetails.email);
  //   if (emailError) newErrors.email = emailError;

  //   const phoneError = validatePhone(adminDetails.phone);
  //   if (phoneError) newErrors.phone = phoneError;

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // };
  const validateForm = () => {
    const newErrors: Record<string, string> = {}; // Use ValidationErrors type
    if (formData.name.trim() === "") {
      newErrors.name = "يجب أن يكون لديك اسم للمنتج";
      // setErrors({ ...errors, name: "يجب أن يكون لديك اسم للمنتج" });
    }
    if (formData.price <= 0) {
      newErrors.price = "يجب أن يكون السعر أكبر من 0";
    }
    if (formData.originalPrice && formData.originalPrice < formData.price) {
      newErrors.originalPrice =
        "يجب أن يكون السعر الأصلي أكبر من أو يساوي السعر";
    }
    // if (formData.category.trim() === "") {
    //   return "يجب أن يكون لديك فئة للمنتج";
    // }
    if (formData.sizes.length === 0) {
      newErrors.sizes = "يجب أن يكون لديك مقاسات للمنتج";
    }
    if (formData.colors.length === 0) {
      newErrors.colors = "يجب أن يكون لديك ألوان للمنتج";
    }
    if (formData.images.length + currentProductImages.length === 0) {
      newErrors.images = "يجب أن يكون لديك صور للمنتج";
    } else if (formData.images.length + currentProductImages.length > 8) {
      newErrors.images = "يجب أن يكون لديك أقل من 8 صور للمنتج";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSizesChange = (sizes: string[]) => {
    setFormData({ ...formData, sizes });
    setErrors({ ...errors, sizes: "" });
  };

  const handleColorsChange = (colors: string[][]) => {
    setFormData({ ...formData, colors: colors });
    setErrors({ ...errors, colors: "" });
  };

  const handleImagesChange = (images: string[]) => {
    setFormData({ ...formData, images });
    setErrors({ ...errors, images: "" });
  };

  // useEffect(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{productId ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(e);
          }}
          className={styles.modalBody}
        >
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>اسم المنتج *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>الوصف *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>السعر *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
              />
              {errors.price && <p className={styles.error}>{errors.price}</p>}
            </div>
            <div className={styles.formGroup}>
              <label>السعر الأصلي *</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                step="0.01"
                min="0"
              />
              {errors.originalPrice && (
                <p className={styles.error}>{errors.originalPrice}</p>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>الفئة </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
              {errors.category && (
                <p className={styles.error}>{errors.category}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label>الفئة الفرعية</label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
              />
              {errors.subCategory && (
                <p className={styles.error}>{errors.subCategory}</p>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>المخزون *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
              />
              {errors.stock && <p className={styles.error}>{errors.stock}</p>}
            </div>
            <div className={styles.formGroup}>
              <label>المادة</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
              />
              {errors.material && (
                <p className={styles.error}>{errors.material}</p>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>المقاسات المتاحة *</label>
            <SizeSelector
              selectedSizes={formData.sizes}
              onChange={handleSizesChange}
            />
            {errors.sizes && <p className={styles.error}>{errors.sizes}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>الألوان المتاحة *</label>
            <ColorPicker colors={colorsAsArray} onChange={handleColorsChange} />
            {errors.colors && <p className={styles.error}>{errors.colors}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>صور المنتج * (حتى 8 صور)</label>
            <ImageUploader
              currentImages={currentProductImages}
              setCurrentImages={setCurrentProductImages}
              images={formData.images}
              onChange={handleImagesChange}
              maxImages={8}
            />
            {errors.images && <p className={styles.error}>{errors.images}</p>}
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.saveButton}
              disabled={loading}
            >
              {loading
                ? "جاري الحفظ..."
                : productId
                ? "حفظ التغييرات"
                : "إضافة المنتج"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
