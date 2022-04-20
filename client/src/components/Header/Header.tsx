import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logOut, setLoginActive } from "../../store/slices";
import { FormLogIn } from "../FormLogIn/FormLogIn";
import { FormRegister } from "../FormRegister/FormRegister";
import { ModalUserWindow } from "../ModalUserWindow/ModalUserWindow";

import "./Header.css";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoginActive, isRegisterActive, user, accessToken } = useAppSelector(
    (state) => state.userReducer
  );

  const request = { ...user, accessToken };

  return (
    <div className={"header-container"}>
      <div className={"logo-container"}>
        <img src={require("../../images/logo.png")} alt={"logo.png"} />
        <div>Mortgage Calculator</div>
      </div>

      <div className="btn-login">
        {user && <div>{user.firstName}</div>}
        <button
          onClick={() => {
            dispatch(setLoginActive());
            if (accessToken && request) dispatch(logOut(request));
          }}
        >
          {!accessToken ? "Log In" : "Log out"}
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
