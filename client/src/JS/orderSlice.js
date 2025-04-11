import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// GET all orders (admin)
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5800/api/orders");
      return res.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// GET orders by user ID
export const getOrdersByUser = createAsyncThunk(
  "order/getOrdersByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5800/api/orders/user/${userId}`);
      return res.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// GET single order by ID
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5800/api/orders/${orderId}`);
      return res.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// CREATE new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5800/api/orders", orderData);
      return res.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// UPDATE order
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, updateData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5800/api/orders/${orderId}`,
        updateData
      );
      return res.data.updatedOrder;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// DELETE order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5800/api/orders/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL ORDERS
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ORDERS BY USER
      .addCase(getOrdersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ORDER BY ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE ORDER
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
        state.currentOrder = action.payload;
        state.success = true;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE ORDER
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;