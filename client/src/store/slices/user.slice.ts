import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  ILogOutRequest,
  IResponse,
  IResult,
  IUser,
} from "../../interfaces/user.interface";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";

interface IInitialState {
  user?: Partial<IUser>;
  accessToken?: string;
  refreshToken?: string;
  isRegisterActive: boolean;
  isLoginActive: boolean;
  message: string;
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
  message: "",
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

export const logIn = createAsyncThunk<IResponse, Partial<IUser>>(
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

export const logOut = createAsyncThunk(
  "userSlice/logOut",
  async (data: ILogOutRequest) => {
    try {
      const response = await authService.logout(data);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendResult = createAsyncThunk(
  "userSlice/sendResult",
  async (data: IResult) => {
    try {
      const response = await userService.sendResult(data);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setRegisterActive: (state) => {
      state.isRegisterActive = !state.isRegisterActive;
      state.isLoginActive = false;
    },

    setLoginActive: (state) => {
      state.isLoginActive = !state.isLoginActive;
    },

    setUserModalActive: (state) => {
      state.isLoginActive = false;
      state.isRegisterActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isRegisterActive = false;

      console.log(state.user);
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;

      console.log(state.user);
    });

    builder.addCase(logOut.fulfilled, (state, action) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = undefined;
      state.isLoginActive = false;

      console.log("ok", action.payload?.data);
    });

    builder.addCase(sendResult.fulfilled, (state) => {
      state.message = `The result was send to your email, ${state.user?.firstName} !`;
      console.log(state.message);
    });
  },
});

const userReducer = userSlice.reducer;

export const { setLoginActive, setRegisterActive, setUserModalActive } =
  userSlice.actions;

export { userReducer };
