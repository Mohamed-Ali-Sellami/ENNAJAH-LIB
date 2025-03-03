import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/////////////////////////GET order/////////////////////////////////////
export const getorder = createAsyncThunk("/getorder", async () => {
  try {
    let resultat = axios.get("https://site-ecommerce1backend.vercel.app/order/all");
    return await resultat;
  } catch (error) {
    console.log(error);
  }
});
/////////////////////////ADD order//////////////////////////////////////////
export const addorder = createAsyncThunk("/addorder", async (neworder) => {
  try {
    let resultat = axios.post("https://site-ecommerce1backend.vercel.app/order/add", neworder);
    return await resultat;
  } catch (error) {
    console.log(error);
  }
});
//////////////////////delete order////////////////////////////////////////

export const deleteorder = createAsyncThunk("/deleteorder", async (id) => {
  try {
    let resultat = axios.delete(`https://site-ecommerce1backend.vercel.app/order/${id}`);
    return await resultat;
  } catch (error) {
    console.log(error);
  }
});
///////////////////////////update order////////////////////////////////
export const updateorder = createAsyncThunk(
  "/updateorder",
  async ({ id, uporder }) => {
    try {
      let resultat = axios.put(`https://site-ecommerce1backend.vercel.app/order/${id}`, uporder);
      return await resultat;
    } catch (error) {
      console.log(error);
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

      //getorder
      .addCase(getorder.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getorder.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = action.payload?.data?.order;
      })

      .addCase(getorder.rejected, (state) => {
        state.status = "fail";
      })

      //addorder
      .addCase(addorder.pending, (state) => {
        state.status = "pending";
      })

      .addCase(addorder.fulfilled, (state) => {
        state.status = "success";
      })

      .addCase(addorder.rejected, (state) => {
        state.status = "fail";
      })

      //deleteorder

      .addCase(deleteorder.pending, (state) => {
        state.status = "pending";
      })

      .addCase(deleteorder.fulfilled, (state) => {
        state.status = "success";
      })

      .addCase(deleteorder.rejected, (state) => {
        state.status = "fail";
      })

      //Updateorder
      .addCase(updateorder.pending, (state) => {
        state.status = "pending";
      })

      .addCase(updateorder.fulfilled, (state) => {
        state.status = "success";
      })

      .addCase(updateorder.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
