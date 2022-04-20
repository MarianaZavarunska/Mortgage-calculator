import React, { FC } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IUser } from "../../interfaces/user.interface";
import { logIn, setLoginActive, setRegisterActive } from "../../store/slices";

import "./FormLogIn.css";

const FormLogIn: FC = () => {
  const { register, handleSubmit, reset } = useForm<{
    email: string;
    password: string;
  }>();

  const dispatch = useAppDispatch();
  // const { isLoginActive } = useAppSelector((state) => state.userReducer);

  const onSubmitForm = async (data: Partial<IUser>) => {
    await dispatch(logIn(data));
    dispatch(setLoginActive());
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)} className="logIn-form">
        <div className="logIn-content">
          <label>Login</label>
          <input type="text" {...register("email")} />

          {/* {errors.email && (
            <div className="error-container">{errors.email.message}</div>
          )} */}
        </div>
        <div className="logIn-content">
          <label>Password</label>
          <input type="text" {...register("password")} />

          {/* {errors.password && (
            <div className="error-container">{errors.password.message}</div>
          )} */}
        </div>
        <div className="btn-container">
          <button type="submit">Log in</button>
          <button
            type="button"
            onClick={() => {
              dispatch(setRegisterActive());
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export { FormLogIn };
