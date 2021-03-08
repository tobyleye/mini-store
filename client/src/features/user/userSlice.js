import { createSlice } from "@reduxjs/toolkit";
import client from "../../client";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    isLoginLoading: false,
    isSignupLoading: false,
    loginError: null,
    signupError: null,
    user: null,
  },
  reducers: {
    loginLoading(state, action) {
      state.isLoginLoading = action.payload;
    },
    loginFailed(state, action) {
      state.loginError = action.payload;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    signupLoading(state, action) {
      state.isSignupLoading = action.payload;
    },
    signupFailed(state, action) {
      state.signupError = action.payload;
    },
    clearSignupError(state) {
      state.signupError = null;
    },
  },
});

export const {
  loginLoading,
  loginFailed,
  loginSuccess,
  clearLoginError,
  signupLoading,
  signupFailed,
  signupSuccess,
  clearSignupError,
} = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const login = ({ username, password }) => async (dispatch) => {
  dispatch(loginLoading(true));
  dispatch(clearLoginError());
  try {
    const { data } = await client.post("/login", { username, password });
    dispatch(loginLoading(false));
    setTimeout(() => {
      // wait a few ms before redirecting
      dispatch(loginSuccess(data));
    }, 500);
  } catch (error) {
    dispatch(loginLoading(false));
    dispatch(loginFailed(error.response.data.error));
  }
};

export const register = ({ username, password }) => async (dispatch) => {
  dispatch(signupLoading(true));
  dispatch(clearSignupError());
  try {
    const { data } = await client.post("/register", { username, password });
    dispatch(signupLoading(false));
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(signupLoading(false));
    dispatch(signupFailed(error.response.data.error));
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default userSlice.reducer;
