import type { CreateProductData } from "@/types/admin.types";

/**
 * Converts product data to FormData for multipart/form-data submission
 * Handles images, sizes, and colors arrays properly
 */
export const productToFormData = (
  data: CreateProductData | Partial<CreateProductData>
): FormData => {
  const formData = new FormData();

  // Add simple fields
  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.price !== undefined) formData.append("price", data.price.toString());
  if (data.originalPrice !== undefined)
    formData.append("originalPrice", data.originalPrice.toString());
  if (data.category) formData.append("category", data.category);
  if (data.subCategory) formData.append("subCategory", data.subCategory);
  if (data.material) formData.append("material", data.material);
  if (data.style) formData.append("style", data.style);
  if (data.fit) formData.append("fit", data.fit);
  if (data.stock !== undefined) formData.append("stock", data.stock.toString());
  if (data.currentProductImages && data.currentProductImages.length > 0) {
    formData.append(
      "currentProductImages",
      JSON.stringify(data.currentProductImages)
    );
  }
  // Handle sizes array
  if (data.sizes && data.sizes.length > 0) {
    formData.append("sizes", JSON.stringify(data.sizes));
  }

  // Handle colors array (can be string[] or string[][])
  if (data.colors && data.colors.length > 0) {
    formData.append("colors", JSON.stringify(data.colors));
  }

  // Handle images array
  if (data.images && data.images.length > 0) {
    data.images.forEach((image, index) => {
      if (image.startsWith("data:")) {
        // Convert base64 to Blob
        const base64Data = image.split(",")[1];
        const mimeType = image.match(/data:([^;]+);/)?.[1] || "image/jpeg";
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });

        // Generate filename
        const extension = mimeType.split("/")[1];
        const filename = `image-${index + 1}.${extension}`;

        formData.append("images", blob, filename);
      } else {
        // It's a URL, append as string
        formData.append("imageUrls", image);
      }
    });
  }

  return formData;
};

/**
 * Logs FormData contents for debugging
 */
export const logFormData = (formData: FormData): void => {
  console.log("FormData contents:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof Blob) {
      console.log(`${key}:`, `Blob(${value.size} bytes, type: ${value.type})`);
    } else {
      console.log(`${key}:`, value);
    }
  }
};
