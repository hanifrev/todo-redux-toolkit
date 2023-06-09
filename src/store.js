import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiTodo } from "./services/apiSlice";
import todoSlice from "./feature/todoSlice";

export const store = configureStore({
  reducer: {
    totalItems: todoSlice,
    [apiTodo.reducerPath]: apiTodo.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiTodo.middleware),
});

setupListeners(store.dispatch);
