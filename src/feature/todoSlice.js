import { createSlice } from "@reduxjs/toolkit";

const initialState = { total: 0, completed: 0, uncompleted: 0 };

const todoSlice = createSlice({
  name: "totalItems",
  initialState: initialState,
  reducers: {
    itemsCount: (state, action) => {
      state.total = action.payload;
    },
    completedCount: (state, action) => {
      state.completed = action.payload;
    },
    uncompletedCount: (state, action) => {
      state.uncompleted = action.payload;
    },
  },
});

export const { itemsCount, completedCount, uncompletedCount } =
  todoSlice.actions;
export default todoSlice.reducer;
