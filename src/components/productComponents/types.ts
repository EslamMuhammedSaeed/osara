export type ProductData = {
  id: number;
  name: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  sizes: string[];
  freeShippingThreshold: number;
  colors: { name: string; value: string }[];
};

export type ProductCardData = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  currency: string;
  image: string;
};
