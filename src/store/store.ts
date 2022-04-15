import {combineReducers, configureStore} from "@reduxjs/toolkit";

import { bankReducer } from "./slices";

const rootReducer = combineReducers({
   bankReducer
})

export const setUpStore = () =>  configureStore({
    reducer: {
        rootReducer,
    },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore['dispatch']; // to put into only actions