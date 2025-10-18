import type { ProductData } from "@components/productComponents/types";
import product_1_1 from "@assets/products/product_1/1.jpeg";
import product_1_2 from "@assets/products/product_1/2.jpeg";
import product_1_3 from "@assets/products/product_1/3.jpeg";
import product_1_4 from "@assets/products/product_1/4.jpeg";
import product_1_5 from "@assets/products/product_1/5.jpeg";
// import product_1_6 from "@assets/products/product_1/6.jpeg";
// import product_1_7 from "@assets/products/product_1/7.jpeg";
// import product_1_8 from "@assets/products/product_1/8.jpeg";

import product_2_1 from "@assets/products/product_2/1.jpeg";
import product_2_2 from "@assets/products/product_2/2.jpeg";
import product_2_3 from "@assets/products/product_2/3.jpeg";
import product_2_4 from "@assets/products/product_2/4.jpeg";
import product_2_5 from "@assets/products/product_2/5.jpeg";
import product_2_6 from "@assets/products/product_2/6.jpeg";
import product_2_7 from "@assets/products/product_2/7.jpeg";
import product_2_8 from "@assets/products/product_2/8.jpeg";

import product_3_1 from "@assets/products/product_3/1.jpeg";
import product_3_2 from "@assets/products/product_3/2.jpeg";
import product_3_3 from "@assets/products/product_3/3.jpeg";
import product_3_4 from "@assets/products/product_3/4.jpeg";
import product_3_5 from "@assets/products/product_3/5.jpeg";
import product_3_6 from "@assets/products/product_3/6.jpeg";
import product_3_7 from "@assets/products/product_3/7.jpeg";
import product_3_8 from "@assets/products/product_3/8.jpeg";

import product1 from "@assets/product_1.jpeg";
import product2 from "@assets/product_2.jpeg";
import product3 from "@assets/product_3.jpeg";
// Mock Data
export const productData: ProductData[] = [
  {
    id: 1,
    name: "دريس وجدان",
    price: 770.0,
    currency: "EGP",
    rating: 5,
    reviews: 5,
    description: `دريس يجمع بين الشياكة والراحة ،عبارة عن دريس كلوش ممكن يتلبس بأسورة مميزه جدًا وراقية من خامة الكريب الدايموند أجود انواع الكريب المستورد.`,
    images: [
      product_1_1,
      product_1_2,
      product_1_3,
      product_1_4,
      product_1_5,
      //   product_1_6,
      //   product_1_7,
      //   product_1_8,
    ],
    colors: [
      { name: "Black", value: "#000000" }, // Black
      { name: "Purple", value: "#800080" }, // Purple
      { name: "Burgundy", value: "#800020" }, // Burgundy / Maroon
      { name: "Pink", value: "#FFC0CB" }, // Pink (light rosy tone)
      { name: "Teal", value: "#01796F" }, // Teal / Dark turquoise
      { name: "Royal Green", value: "#00563B" }, // Royal green / Deep emerald
    ],
    sizes: ["L", "XL"],
    freeShippingThreshold: 199,
  },
  {
    id: 2,
    name: "دريس إشراقة",
    price: 799.0,
    currency: "EGP",
    rating: 5,
    reviews: 5,
    description: `دريس مميز وجذاب وراقي جدًا 
من الخامة الكتان دبل كلوش 
متوفر بمقاسين لارج واكس لارج .`,
    images: [
      product_2_1,
      product_2_2,
      product_2_3,
      product_2_4,
      product_2_5,
      product_2_6,
      product_2_7,
      product_2_8,
    ],
    // colors: [
    //   { name: "Navy Blue", value: "#1e3a8a" },
    //   { name: "White", value: "#ffffff" },
    //   { name: "Red & Black", value: "#dc2626", secondValue: "#000000" },
    // ],
    colors: [
      { name: "Beige", value: "#F5F5DC" }, // Beige
      { name: "Havana", value: "#A0522D" }, // Havana (warm brownish tone)
      { name: "Terracotta", value: "#B66E5D" }, // Terracotta / Brick (reddish clay)
      { name: "Teal", value: "#01796F" }, // Teal / Dark turquoise
      { name: "Pink", value: "#FFC0CB" }, // Pink
      { name: "Olive", value: "#808000" }, // Olive
      { name: "Fuchsia", value: "#FF00FF" }, // Fuchsia (bright magenta)
    ],
    sizes: ["L", "XL"],
    freeShippingThreshold: 199,
  },
  {
    id: 3,
    name: "دريس أُسارا",
    price: 1299.0,
    currency: "EGP",
    rating: 5,
    reviews: 5,
    description: `دريس أُسارا دريس يجمع بين الشياكة والراحة ،مكون من قطعتين القطعة الاولي عبارة عن بيزك دبل كلوش ممكن يتلبس كدريس لوحدة والقطعة الثانيه فيست كلوش من خامة الكريب الوا أجود انواع الكريب.`,
    images: [
      product_3_1,
      product_3_2,
      product_3_3,
      product_3_4,
      product_3_5,
      product_3_6,
      product_3_7,
      product_3_8,
    ],
    colors: [
      { name: "Burgundy & Gray", value: "#800020", secondValue: "#94A3B8" }, // Burgundy + Gray
      { name: "Yellow & Brown", value: "#FFD700", secondValue: "#8B4513" }, // Yellow + Brown
      { name: "Cream & Olive", value: "#FFFDD0", secondValue: "#808000" }, // Cream + Olive
    ],
    sizes: ["L", "XL"],
    freeShippingThreshold: 199,
  },
];

export const ourProducts = [
  {
    id: 1,
    image: product1,
    title: "دريس وجدان",
    price: 770.0,
    originalPrice: 900.0,
  },
  {
    id: 2,
    image: product2,
    title: "دريس إشراقة",
    price: 799.0,
    originalPrice: 950.0,
  },
  {
    id: 3,
    image: product3,
    title: "دريس أُسارا",
    price: 1299.0,
    originalPrice: 1400.0,
  },
];
