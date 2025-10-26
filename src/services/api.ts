import axios, { AxiosError } from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type {
  Admin,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  DashboardStats,
  Product,
  Order,
  CreateOrderData,
  OrderStatus,
  PaginatedResponse,
  ApiResponse,
  OrderFilters,
  ProductFilters,
} from "@/types/admin.types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("adminToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// Admin APIs
export const adminAPI = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/admin/register",
      data
    );
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/admin/login",
      credentials
    );
    if (response.data.success && response.data.data.token) {
      localStorage.setItem("adminToken", response.data.data.token);
    }
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<Admin>> => {
    const response = await apiClient.get<ApiResponse<Admin>>("/admin/profile");
    return response.data;
  },

  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>(
      "/admin/dashboard/stats"
    );
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("adminToken");
  },
};

// Products APIs
export const productsAPI = {
  getAll: async (
    filters?: ProductFilters
  ): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      "/products",
      {
        params: filters,
      }
    );
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/products/${id}`
    );
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get<ApiResponse<string[]>>(
      "/products/categories"
    );
    return response.data;
  },

  create: async (formData: FormData): Promise<ApiResponse<Product>> => {
    const response = await apiClient.post<ApiResponse<Product>>(
      "/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  update: async (
    id: number,
    formData: FormData
  ): Promise<ApiResponse<Product>> => {
    const response = await apiClient.post<ApiResponse<Product>>(
      `/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/products/${id}`
    );
    return response.data;
  },
};

// Orders APIs
export const ordersAPI = {
  getAll: async (filters?: OrderFilters): Promise<PaginatedResponse<Order>> => {
    const response = await apiClient.get<PaginatedResponse<Order>>("/orders", {
      params: filters,
    });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Order>> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data;
  },

  create: async (data: CreateOrderData): Promise<ApiResponse<Order>> => {
    const response = await apiClient.post<ApiResponse<Order>>("/orders", data);
    return response.data;
  },

  updateStatus: async (
    id: number,
    status: OrderStatus
  ): Promise<ApiResponse<Order>> => {
    const response = await apiClient.patch<ApiResponse<Order>>(
      `/orders/${id}/status`,
      {
        status,
      }
    );
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/orders/${id}`);
    return response.data;
  },
};

export default apiClient;
