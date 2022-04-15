import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const bankSlice = createSlice({
  name: "bankSlice",
  initialState,
  reducers: {},
});

const bankReducer = bankSlice.reducer;

export { bankReducer };
