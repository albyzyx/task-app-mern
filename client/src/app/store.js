import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import taskReducer from "../features/tasks/taskSlice";

export default configureStore({
  reducer: {
    userState: userReducer,
    taskState: taskReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
