import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    usserInfo: null,
    userToken: null,
  },
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    setUserInfo: (state, action) => {
      state.usserInfo = action.payload;
    },
    setuserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const { logIn, logOut, setUserInfo, setuserToken } = loginSlice.actions;
export default loginSlice.reducer;
