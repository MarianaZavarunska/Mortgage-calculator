import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { bankReducer, userReducer } from "./slices";

const rootReducer = combineReducers({
  bankReducer,
  userReducer,
});

export const setUpStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore["dispatch"]; // to put into only actions
