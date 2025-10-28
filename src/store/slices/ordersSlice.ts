import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ordersAPI } from "@/services/api";
import type {
  Order,
  OrderFilters,
  OrderStatus,
  PaginatedResponse,
  ApiError,
  CreateOrderData,
} from "@/types/admin.types";

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: OrderFilters;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
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
export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (filters: OrderFilters | undefined, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getAll(filters);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل جلب الطلبات"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getById(id);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل جلب الطلب"
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/create",
  async ({ data }: { data: CreateOrderData }, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.create(data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل إنشاء الطلب"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (
    { id, status }: { id: number; status: OrderStatus },
    { rejectWithValue }
  ) => {
    try {
      const response = await ordersAPI.updateStatus(id, status);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل تحديث حالة الطلب"
      );
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await ordersAPI.delete(id);
      return id;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message || "فشل حذف الطلب"
      );
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<OrderFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Order>>) => {
          state.loading = false;
          state.orders = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Order Status
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
          if (state.currentOrder?.id === action.payload.id) {
            state.currentOrder = action.payload;
          }
        }
      )
      // Delete Order
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.orders = state.orders.filter(
            (order) => order.id !== action.payload
          );
        }
      );
  },
});

export const { setFilters, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;
