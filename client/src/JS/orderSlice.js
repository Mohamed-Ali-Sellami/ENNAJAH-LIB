import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// GET all orders
export const getorder = createAsyncThunk("order/getorder", async () => {
  try {
    const res = await axios.get("http://localhost:5800/order/all");
    return res.data.order;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// ADD a new order
export const addorder = createAsyncThunk("order/addorder", async (neworder) => {
  try {
    const res = await axios.post("http://localhost:5800/order/add", neworder);
    return res.data.order;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// DELETE an order
export const deleteorder = createAsyncThunk("order/deleteorder", async (id) => {
  try {
    await axios.delete(`http://localhost:5800/order/${id}`);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// UPDATE an order
export const updateorder = createAsyncThunk(
  "order/updateorder",
  async ({ id, uporder }) => {
    try {
      const res = await axios.put(`http://localhost:5800/order/${id}`, uporder);
      return res.data.updatedOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  orders: [],
  status: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getorder.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getorder.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = action.payload;
      })
      .addCase(getorder.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })

      // ADD
      .addCase(addorder.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addorder.fulfilled, (state, action) => {
        state.status = "success";
        state.orders.push(action.payload); // ajoute l'ordre localement
      })
      .addCase(addorder.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteorder.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteorder.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = state.orders.filter(order => order._id !== action.payload);
      })
      .addCase(deleteorder.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateorder.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateorder.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateorder.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
