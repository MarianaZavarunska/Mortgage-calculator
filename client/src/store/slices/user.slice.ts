import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

import { IResponse, IUser } from "../../interfaces/user.interface";
import { authService } from "../../services/auth.service";

interface IInitialState {
  user?: Partial<IUser>;
  accessToken?: string;
  refreshToken?: string;
  isRegisterActive: boolean;
  isLoginActive: boolean;
}

const initialState: IInitialState = {
  user: {
    firstName: "",
    lastName: "",
    age: 18,
    phone: "",
    email: "",
    password: "",
  },
  accessToken: undefined,
  refreshToken: undefined,
  isRegisterActive: false,
  isLoginActive: false,
};

export const registration = createAsyncThunk<IResponse, IUser>(
  "userSlice/registartion",
  async (user) => {
    try {
      const { data } = await authService.registartion(user);

      return data;
    } catch (error) {
      return {
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined,
      };
    }
  }
);

export const login = createAsyncThunk<IResponse, Partial<IUser>>(
  "userSlice/login",
  async (user) => {
    try {
      const { data } = await authService.login(user);

      return data;
    } catch (error) {
      return {
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined,
      };
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setRegisterActive: (state) => {
      //   state.isLoginActive = false;
      state.isRegisterActive = !state.isRegisterActive;
      state.isLoginActive = false;
    },
    setLoginActive: (state) => {
      state.isLoginActive = !state.isLoginActive;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      console.log(state.user);
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isLoginActive = false;
      console.log(state.user);
    });

    // builder.addCase(userLogOut.fulfilled, (state, action) => {
    //   state.accessToken = undefined;
    //   state.refreshToken = undefined;
    // });
  },
});

const userReducer = userSlice.reducer;

export const { setLoginActive, setRegisterActive } = userSlice.actions;

export { userReducer };
