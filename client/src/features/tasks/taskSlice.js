import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TaskClass from "../../app/Tasks";

const initialState = {
  tasks: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: [],
};

const task = new TaskClass();

const createTask = createAsyncThunk("/api/createTask", (tasks, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await task
      .createTask(tasks)
      .then((tasks) => resolve(tasks))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const getTasks = createAsyncThunk("/api/getTasks", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await task
      .getTasks()
      .then((tasks) => resolve(tasks))
      .catch((error) => reject(thunkAPI.rejectWithValue(error)));
  });
});

const deleteTask = createAsyncThunk("/api/tasks", (tasks, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await task
      .deleteTasks(tasks)
      .then((deletedTask) => resolve(deletedTask))
      .catch((error) => reject(thunkAPI.rejectWithValue(error)));
  });
});

const updateTask = createAsyncThunk(
  "/api/updateTask",
  (taskToUpdate, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await task
        .updateTask(taskToUpdate)
        .then((updatedTasks) => resolve(updatedTasks))
        .catch((error) => reject(thunkAPI.rejectWithValue(error)));
    });
  }
);

const taskSlice = createSlice({
  name: "taskState",
  initialState,
  reducers: {
    clearTaskState: (state) => {
      state.tasks = [];
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = [];
    },
  },
  extraReducers: {
    //createTask
    [createTask.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [createTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(payload);
      state.tasks.push(payload);
    },
    [createTask.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //getTasks
    [getTasks.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.tasks = payload.tasks.map((task) => task);
    },
    [getTasks.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //deleteTasks
    [deleteTask.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.tasks = state.tasks.filter((task) => {
        return task._id !== payload._id;
      });
    },
    [deleteTask.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //updateTask
    [updateTask.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [updateTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.tasks = state.tasks.map((task) => {
        if (task._id === payload._id) return payload;
        else return task;
      });
    },
    [updateTask.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
  },
});

export { createTask, getTasks, deleteTask, updateTask };

export const { clearTaskState } = taskSlice.actions;

export const selectTasks = (state) => state.taskState;

export default taskSlice.reducer;
