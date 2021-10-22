import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskState: [],
  onGoingState: [],
  completed: [],
};

const GlobalState = createSlice({
  name: "Project Management",
  initialState,
  reducers: {
    addScheduledTask: (state, { payload }) => {
      state.taskState = payload;
    },
  },
});

export const { addScheduledTask } = GlobalState.actions;
export default GlobalState.reducer;
