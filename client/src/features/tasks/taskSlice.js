import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskState: (state, action) => {
      state.tasks = action.payload.tasks;
    },
  },
});

export const { setTaskState } = taskSlice.actions;

export const selectUser = (state) => state.task.tasks;

export default taskSlice.reducer;
