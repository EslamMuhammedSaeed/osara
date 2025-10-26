import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { productsAPI } from "@/services/api";
import { productToFormData } from "@/utils/formData";
import type {
  Product,
  ProductFilters,
  CreateProductData,
  PaginatedResponse,
  ApiError,
} from "@/types/admin.types";

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  categories: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (filters: ProductFilters | undefined, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getAll(filters);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل جلب المنتجات"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getById(id);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل جلب المنتج"
      );
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getCategories();
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل جلب الفئات"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (data: CreateProductData, { rejectWithValue }) => {
    try {
      const formData = productToFormData(data);
      const response = await productsAPI.create(formData);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل إضافة المنتج"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    { id, data }: { id: number; data: Partial<CreateProductData> },
    { rejectWithValue }
  ) => {
    try {
      const formData = productToFormData(data);
      const response = await productsAPI.update(id, formData);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل تحديث المنتج"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await productsAPI.delete(id);
      return id;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل حذف المنتج"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Product>>) => {
          state.loading = false;
          state.products = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Product by ID
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.currentProduct = action.payload;
        }
      )
      // Fetch Categories
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.categories = action.payload;
        }
      )
      // Create Product
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.unshift(action.payload);
        }
      )
      // Update Product
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        }
      )
      // Delete Product
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
      );
  },
});

export const { setFilters, clearError } = productsSlice.actions;
export default productsSlice.reducer;
