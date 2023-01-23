


import { createSlice } from "@reduxjs/toolkit";

// Why is this simply not declared within createSlice?
const initialState = {
  mode: "dark",
  userId: "63701cc1f032394c4900011b"
};

export const globalSlice = createSlice({
  // https://redux-toolkit.js.org/api/createSlice
  // A name, used in action types
  name: "global",
  // The initial state for the reducer
  initialState,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
