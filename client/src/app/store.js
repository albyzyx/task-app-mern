import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import taskReducer from "../features/tasks/taskSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
