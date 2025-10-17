import type { ProductData } from "@components/productComponents/types";
import product_1_1 from "@assets/products/product_1/1.jpeg";
import product_1_2 from "@assets/products/product_1/2.jpeg";
import product_1_3 from "@assets/products/product_1/3.jpeg";
import product_1_4 from "@assets/products/product_1/4.jpeg";
import product_1_5 from "@assets/products/product_1/5.jpeg";
import product_1_6 from "@assets/products/product_1/6.jpeg";
import product_1_7 from "@assets/products/product_1/7.jpeg";
import product_1_8 from "@assets/products/product_1/8.jpeg";

import product_2_1 from "@assets/products/product_2/1.jpeg";
import product_2_2 from "@assets/products/product_2/2.jpeg";
import product_2_3 from "@assets/products/product_2/3.jpeg";
import product_2_4 from "@assets/products/product_2/4.jpeg";
import product_2_5 from "@assets/products/product_2/5.jpeg";
import product_2_6 from "@assets/products/product_2/6.jpeg";
import product_2_7 from "@assets/products/product_2/7.jpeg";
import product_2_8 from "@assets/products/product_2/8.jpeg";

import product1 from "@assets/product_1.jpeg";
import product2 from "@assets/product_2.jpeg";
import product3 from "@assets/product_3.jpeg";
// Mock Data
export const productData: ProductData[] = [
  {
    id: 1,
    name: "المنتج الأول",
    price: 1650.0,
    currency: "EGP",
    rating: 5,
    reviews: 5,
    description: `Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis.
    
    Magna ert si amet purus gravid a quisiit turpis.Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis. Magna ert si amet purus gravid a quisiit turpis.Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis.`,
    images: [
      product_1_1,
      product_1_2,
      product_1_3,
      product_1_4,
      product_1_5,
      product_1_6,
      product_1_7,
      product_1_8,
    ],
    colors: [
      { name: "Gray", value: "#94A3B8" },
      { name: "Black", value: "#1E293B" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    freeShippingThreshold: 199,
  },
  {
    id: 2,
    name: "المنتج الثاني",
    price: 1650.0,
    currency: "EGP",
    rating: 5,
    reviews: 5,
    description: `Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis.
    
    Magna ert si amet purus gravid a quisiit turpis.Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis. Magna ert si amet purus gravid a quisiit turpis.Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis.`,
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
    colors: [
      { name: "Gray", value: "#94A3B8" },
      { name: "Black", value: "#1E293B" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    freeShippingThreshold: 199,
  },
  {
    id: 3,
    name: "المنتج الثالث",
    price: 1650.0,
    currency: "EGP",
    rating: 5,
    reviews: 5,
    description: `Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis.
    
    Magna ert si amet purus gravid a quisiit turpis.Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis. Magna ert si amet purus gravid a quisiit turpis.Quisque no s erci ac ductor augue. Lorem ipsum a or sit amet zit 30 consectetur. Tellus erci ac ductor augue. Ut consequat semper viverra nam justo. Magna ert si amet purus gravid a quisiit turpis.`,
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
    colors: [
      { name: "Gray", value: "#94A3B8" },
      { name: "Black", value: "#1E293B" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    freeShippingThreshold: 199,
  },
];

export const ourProducts = [
  {
    id: 1,
    image: product1,
    title: "المنتج الأول",
    price: 1300.0,
    originalPrice: 1800.0,
  },
  {
    id: 2,
    image: product2,
    title: "المنتج الثاني",
    price: 1300.0,
    originalPrice: 1800.0,
  },
  {
    id: 3,
    image: product3,
    title: "المنتج الثالث",
    price: 1300.0,
    originalPrice: 1800.0,
  },
];
