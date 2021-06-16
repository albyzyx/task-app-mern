import { createSlice } from "@reduxjs/toolkit";
import AuthClass from "../../app/Auth";

const initialState = {
  users: null,
  error: null,
};

const auth = new AuthClass();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      auth
        .SignIn(action.payload.user)
        .then((currentUser) => {
          state.user = currentUser;
        })
        .catch((error) => {
          state.error = error;
        });
    },

    setSignOutState: (state, action) => {
      auth
        .SignOut(action.payload.user)
        .then(() => {
          state.user = null;
          state.error = null;
        })
        .catch((error) => {});
    },

    setSignUpState: (state, action) => {
      auth
        .SignUp(action.payload.user)
        .then((currentUser) => {
          state.user = currentUser;
        })
        .catch((error) => {
          state.error = error;
        });
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export const selectUser = (state) => state.users;
export const selectError = (state) => state.error;

export default userSlice.reducer;
