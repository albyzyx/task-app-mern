import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthClass from "../../app/Auth";

const initialState = {
  user: null,
};

const auth = new AuthClass();

const setUserLoginDetails = createAsyncThunk(
  "/api/auth/signin",
  async (user) => {
    try {
      const res = await auth.signIn(user);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const setSignOutState = createAsyncThunk("/api/auth/signout", async (user) => {
  try {
    const res = await auth.SignOut(user);
    return res;
  } catch (error) {
    return error;
  }
});

const setSignUpState = createAsyncThunk("/api/auth/signup", async (user) => {
  try {
    const res = await auth.SignUp(user);
    return res;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(setUserLoginDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(state.user);
      })
      .addCase(setSignOutState.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(setSignUpState.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export { setUserLoginDetails, setSignOutState, setSignUpState };

export const {} = userSlice.actions;

export const selectUser = (state) => state.userState;
export const selectError = (state) => state.error;

export default userSlice.reducer;
