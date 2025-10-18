import React, { useState, useEffect } from "react";
import { governs, cities } from "@utils/consts";
import styles from "./ShippingForm.module.scss";

interface ShippingFormProps {
  onShippingFeeChange: (fee: number) => void;
}

interface ShippingData {
  name: string;
  email: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  governorate?: string;
  city?: string;
  address?: string;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onShippingFeeChange }) => {
  const [formData, setFormData] = useState<ShippingData>({
    name: "",
    email: "",
    phone: "",
    governorate: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [filteredCities, setFilteredCities] = useState<typeof cities>([]);

  // Filter cities when governorate changes
  useEffect(() => {
    if (formData.governorate) {
      const citiesInGovernorate = cities.filter(
        (city) => city.governorate_id === formData.governorate
      );
      setFilteredCities(citiesInGovernorate);

      // Reset city if it's not in the new governorate
      const isCityValid = citiesInGovernorate.some(
        (city) => city.id === formData.city
      );
      if (!isCityValid) {
        setFormData((prev) => ({ ...prev, city: "" }));
        onShippingFeeChange(0);
      }
    } else {
      setFilteredCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
      onShippingFeeChange(0);
    }
  }, [formData.governorate, onShippingFeeChange]);

  // Update shipping fee when city changes
  useEffect(() => {
    if (formData.city) {
      const selectedCity = cities.find((city) => city.id === formData.city);
      if (selectedCity) {
        onShippingFeeChange(selectedCity.shippingFees ?? 0);
      }
    } else {
      onShippingFeeChange(0);
    }
  }, [formData.city, onShippingFeeChange]);

  const validatePhone = (phone: string): boolean => {
    // Remove spaces and check if it's exactly 10 digits
    const cleanPhone = phone.replace(/\s/g, "");

    // Check if it's 10 digits and starts with 10, 11, 12, or 15
    const phoneRegex = /^(10|11|12|15)\d{8}$/;
    return phoneRegex.test(cleanPhone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: undefined,
      }));
    }
  };

  // const validateForm = (): boolean => {
  //   const newErrors: FormErrors = {};

  //   if (!formData.name.trim()) {
  //     newErrors.name = "الاسم مطلوب";
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = "البريد الإلكتروني مطلوب";
  //   } else if (!validateEmail(formData.email)) {
  //     newErrors.email = "البريد الإلكتروني غير صحيح";
  //   }

  //   if (!formData.phone.trim()) {
  //     newErrors.phone = "رقم الهاتف مطلوب";
  //   } else if (!validatePhone(formData.phone)) {
  //     newErrors.phone =
  //       "رقم الهاتف يجب أن يبدأ بـ 10 أو 11 أو 12 أو 15 ويتكون من 10 أرقام";
  //   }

  //   if (!formData.governorate) {
  //     newErrors.governorate = "المحافظة مطلوبة";
  //   }

  //   if (!formData.city) {
  //     newErrors.city = "المدينة مطلوبة";
  //   }

  //   if (!formData.address.trim()) {
  //     newErrors.address = "العنوان مطلوب";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleBlur = (field: keyof ShippingData) => {
    // Validate specific field on blur
    const newErrors: FormErrors = { ...errors };

    if (field === "email" && formData.email && !validateEmail(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (field === "phone" && formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone =
        "رقم الهاتف يجب أن يبدأ بـ 10 أو 11 أو 12 أو 15 ويتكون من 10 أرقام";
    }

    setErrors(newErrors);
  };

  return (
    <div className={styles.shippingForm}>
      <h3 className={styles.title}>معلومات الشحن</h3>

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          الاسم <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`${styles.input} ${errors.name ? styles.error : ""}`}
          placeholder="أدخل اسمك الكامل"
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          البريد الإلكتروني <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={() => handleBlur("email")}
          className={`${styles.input} ${errors.email ? styles.error : ""}`}
          placeholder="example@email.com"
          dir="ltr"
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          رقم الهاتف <span className={styles.required}>*</span>
        </label>
        <div className={styles.phoneInput}>
          <span className={styles.phoneCode}>+20</span>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur("phone")}
            className={`${styles.input} ${styles.phoneField} ${
              errors.phone ? styles.error : ""
            }`}
            placeholder="1012345678"
            maxLength={10}
            dir="ltr"
          />
        </div>
        {errors.phone && (
          <span className={styles.errorText}>{errors.phone}</span>
        )}
        <span className={styles.hint}>يبدأ بـ 10 أو 11 أو 12 أو 15</span>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="governorate" className={styles.label}>
            المحافظة <span className={styles.required}>*</span>
          </label>
          <select
            id="governorate"
            name="governorate"
            value={formData.governorate}
            onChange={handleInputChange}
            className={`${styles.select} ${
              errors.governorate ? styles.error : ""
            }`}
          >
            <option value="">اختر المحافظة</option>
            {governs.map((gov) => (
              <option key={gov.id} value={gov.id}>
                {gov.governorate_name_ar}
              </option>
            ))}
          </select>
          {errors.governorate && (
            <span className={styles.errorText}>{errors.governorate}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="city" className={styles.label}>
            المدينة <span className={styles.required}>*</span>
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`${styles.select} ${errors.city ? styles.error : ""}`}
            disabled={!formData.governorate}
          >
            <option value="">اختر المدينة</option>
            {filteredCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.city_name_ar} - {city.shippingFees} جنيه
              </option>
            ))}
          </select>
          {errors.city && (
            <span className={styles.errorText}>{errors.city}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.label}>
          العنوان التفصيلي <span className={styles.required}>*</span>
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors.address ? styles.error : ""}`}
          placeholder="رقم الشارع، المنطقة، علامات مميزة..."
          rows={3}
        />
        {errors.address && (
          <span className={styles.errorText}>{errors.address}</span>
        )}
      </div>

      {formData.city && (
        <div className={styles.shippingFeeNote}>
          💰 رسوم الشحن:{" "}
          {cities.find((c) => c.id === formData.city)?.shippingFees} جنيه
        </div>
      )}
    </div>
  );
};

export default ShippingForm;
