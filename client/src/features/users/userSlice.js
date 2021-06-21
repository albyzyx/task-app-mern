import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthClass from "../../app/Auth";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isFetching: false,
  error: [],
};

const auth = new AuthClass();

const signIn = createAsyncThunk("/api/auth/signin", (user, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .signIn(user)
      .then((user) => resolve(user))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const signOut = createAsyncThunk("/api/auth/signout", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject();
      });
  });
});

const signUp = createAsyncThunk("/api/auth/signup", (user, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .signUp(user)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const isLoggedIn = createAsyncThunk("/api/auth/isLoggedin", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .isLoggedIn()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject();
      });
  });
});

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: {
    //signin
    [signIn.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload.user;
    },
    [signIn.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      console.log(payload);
      state.error = payload;
    },
    //signup
    [signUp.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload.user;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //Sign Out
    [signOut.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [signOut.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = null;
    },
    [signOut.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //isLoggedin
    [isLoggedIn.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [isLoggedIn.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload;
    },
    [isLoggedIn.rejected]: (state) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
});

export { signIn, signUp, signOut, isLoggedIn };

export const { clearState } = userSlice.actions;

export const selectUser = (state) => state.userState;

export default userSlice.reducer;
