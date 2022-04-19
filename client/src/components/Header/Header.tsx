import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setLoginActive } from "../../store/slices";
import { FormLogIn } from "../FormLogIn/FormLogIn";
import { FormRegister } from "../FormRegister/FormRegister";
import { ModalUserWindow } from "../ModalUserWindow/ModalUserWindow";

import "./Header.css";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoginActive, isRegisterActive } = useAppSelector(
    (state) => state.userReducer
  );

  return (
    <div className={"header-container"}>
      <div className={"logo-container"}>
        <img src={require("../../images/logo.png")} alt={"logo.png"} />
        <div>Mortgage Calculator</div>
      </div>

      <div className="btn-login">
        <button
          onClick={() => {
            dispatch(setLoginActive());
          }}
        >
          Log In
        </button>
      </div>

      <ModalUserWindow>
        {isLoginActive ? (
          <FormLogIn />
        ) : isRegisterActive ? (
          <FormRegister />
        ) : null}
      </ModalUserWindow>
    </div>
  );
};

export { Header };
