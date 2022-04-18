import { FC } from "react";

import { BankItem, Form, ModalWindow } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setModalActive } from "../../store/slices";

import "./management.page.css";

const ManagementPage: FC = () => {
  const { banks } = useAppSelector((state) => state.bankReducer);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="btn-create">
        <button onClick={() => dispatch(setModalActive())}>Create</button>
      </div>
      <div className={"main-container"}>
        <ul className={"list-container"}>
          {banks &&
            banks.map((bank) => (
              <li key={bank.id} className={"list-item"}>
                <BankItem bank={bank} />
              </li>
            ))}
        </ul>
      </div>

      <ModalWindow>
        <Form />
      </ModalWindow>
    </>
  );
};

export { ManagementPage };
