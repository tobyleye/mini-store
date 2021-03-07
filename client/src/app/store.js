import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
