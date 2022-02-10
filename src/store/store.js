import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";

export default configureStore({
  reducer: {
    products: testReducer,
  },
});
