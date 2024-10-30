import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuth-slice/index";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});

export default store;
