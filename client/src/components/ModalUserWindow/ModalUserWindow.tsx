import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setModalActive } from "../../store/slices";

import "./ModalUserWindow.css";

const ModalUserWindow: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoginActive, isRegisterActive } = useAppSelector(
    (state) => state.userReducer
  );

  return (
    <div
      className={isLoginActive || isRegisterActive ? "modal active" : "modal"}
      onClick={() => {
        dispatch(setModalActive());
      }}
    >
      <div
        className={
          isLoginActive || isRegisterActive
            ? "modal-content active"
            : "modal-content"
        }
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export { ModalUserWindow };
