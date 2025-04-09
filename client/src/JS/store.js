import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import ProductsSlice from './ProductsSlice'
import cartSlice from './cartSlice'
import orderSlice from './orderSlice'

export const store = configureStore({
  reducer: {user:userSlice, Product:ProductsSlice , cart:cartSlice , order:orderSlice},
});
