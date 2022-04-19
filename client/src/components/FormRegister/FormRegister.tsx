import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks";
import { IUser } from "../../interfaces/user.interface";
import { registration } from "../../store/slices";
import "./FormRegister.css";

const FormRegister: FC = () => {
  const { register, handleSubmit, reset } = useForm<IUser>();
  const dispatch = useAppDispatch();

  const onSubmitForm: SubmitHandler<IUser> = async (data: IUser) => {
    // dispatch(setRegisterActive());
    dispatch(registration(data));

    reset();
  };

  return (
    <div>
      <form className="form-register" onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <label>FirstName:</label>
          <input type="text" {...register("firstName")} />
        </div>
        <div>
          <label> LastName:</label>
          <input type="text" {...register("lastName")} />
        </div>

        <div>
          <label>Phone:</label>
          <input type="text" {...register("phone")} />
        </div>

        <div>
          <label> Age: </label>
          <input type="text" {...register("age")} />
        </div>

        <div>
          <label> Email: </label>
          <input type="text" {...register("email")} />
        </div>

        <div>
          <label> Password:</label>
          <input type="text" {...register("password")} />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export { FormRegister };
