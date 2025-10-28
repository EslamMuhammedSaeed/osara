// Admin Types
export interface Admin {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    admin: Admin;
  };
  message: string;
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalProfit: number;
  recentOrders: Order[];
}

// Product Types
export interface Product {
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
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  colors: string[] | string[][]; // Support both single colors and gradients
  sizes: string[];
  images: string[];
  currentProductImages?: string[];
  category: string;
  subCategory: string;
  material?: string;
  style?: string;
  fit?: string;
  stock: number;
}

// Order Types
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "picked"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
  size: string;
  color: string[] | string;
  price: number;
  product?: Product;
}

export interface Order {
  id: number;
  orderNumber?: string; // Optional as backend might not return it
  items: OrderItem[];
  name: string;
  email: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  status: OrderStatus;
  total?: number; // Keep for backward compatibility
  totalAmount?: number; // New field from backend
  profit?: number;
  shippingFee?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateOrderData {
  items: {
    productId: number;
    quantity: number;
    size: string;
    color: string[];
  }[];
  name: string;
  email: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
}

// Pagination and Filters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface OrderFilters extends PaginationParams {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface ProductFilters extends PaginationParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Error type for API calls
export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
