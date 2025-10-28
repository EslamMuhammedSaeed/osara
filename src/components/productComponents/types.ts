export type ProductData = {
  // id: number;
  // name: string;
  // price: number;
  // currency: string;
  // rating: number;
  // reviews: number;
  // description: string;
  // images: string[];
  // sizes: string[];
  // freeShippingThreshold: number;
  // colors: { name: string; value: string; secondValue?: string }[];
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  colors: string[] | string[][]; // Support both single colors and gradients
  sizes: string[];
  images: string[];
  category: string;
  subCategory: string;
  material?: string;
  style?: string;
  fit?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductCardData = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  currency: string;
  image: string;
};
