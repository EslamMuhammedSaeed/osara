import { useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import styles from "./ImageUploader.module.scss";

interface ImageUploaderProps {
  currentImages: string[];
  setCurrentImages: (images: string[]) => void;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImages,
  setCurrentImages,
  images,
  onChange,
  maxImages = 8,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = maxImages - images.length;

    if (files.length > remainingSlots) {
      alert(`يمكنك إضافة ${remainingSlots} صورة فقط`);
      return;
    }

    // Convert files to base64 or URLs
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("يرجى اختيار ملفات صور فقط");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onChange([...images, result]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const handleUrlInput = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   const url = prompt("أدخل رابط الصورة:");
  //   if (url && url.trim()) {
  //     if (images.length >= maxImages) {
  //       alert(`الحد الأقصى ${maxImages} صور`);
  //       return;
  //     }
  //     onChange([...images, url.trim()]);
  //   }
  // };

  const removeImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);
    onChange(newImages);
  };

  const removeCurrentImage = (index: number) => {
    setCurrentImages(currentImages.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.imageUploader}>
      <div className={styles.imageGrid}>
        {currentImages.map((image, index) => (
          <div key={index} className={styles.imageItem}>
            <img
              src={`${import.meta.env.VITE_API_URL}${image}`}
              alt={`صورة ${index + 1}`}
            />
            <div className={styles.imageOverlay}>
              <span className={styles.imageNumber}>{index + 1}</span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeCurrentImage(index)}
                title="حذف"
              >
                <FiX />
              </button>
            </div>
            {index === 0 && <span className={styles.primaryBadge}>رئيسية</span>}
          </div>
        ))}
        {images.map((image, index) => (
          <div
            key={index + currentImages.length + 1}
            className={styles.imageItem}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", index.toString());
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
              moveImage(fromIndex, index);
            }}
          >
            <img src={image} alt={`صورة ${index + 1}`} />
            <div className={styles.imageOverlay}>
              <span className={styles.imageNumber}>
                {index + currentImages.length + 1}
              </span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={(e) => removeImage(e, index)}
                title="حذف"
              >
                <FiX />
              </button>
            </div>
            {index === 0 && currentImages.length === 0 && (
              <span className={styles.primaryBadge}>رئيسية</span>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <FiUpload />
              <span>رفع صورة</span>
              <small>اختر من الجهاز</small>
            </button>

            {/* <button
              type="button"
              className={styles.urlBtn}
              onClick={(e) => handleUrlInput(e)}
            >
              <FiImage />
              <span>رابط صورة</span>
              <small>أدخل URL</small>
            </button> */}
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <div className={styles.info}>
        <p>
          <strong>{images.length}</strong> / {maxImages} صور
        </p>
        <p className={styles.hint}>
          يمكنك إضافة حتى {maxImages} صور. اسحب لإعادة الترتيب. الصورة الأولى هي
          الصورة الرئيسية.
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
