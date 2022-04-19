import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";

import { IBank } from "../../interfaces/bank.interface";
import { deleteBank, setEditedBank, setModalActive } from "../../store/slices";
import "./BankItem.css";

const BankItem: FC<{ bank: IBank }> = ({ bank }) => {
  const { id, bankName, interestRate, maxLoan, minDownPayment, loanTerm } =
    bank;

  const dispatch = useAppDispatch();

  return (
    <>
      <div>{id}</div>
      <div>{bankName}</div>
      <div>{interestRate} %</div>
      <div>{maxLoan} UAH</div>
      <div>{minDownPayment} %</div>
      <div>{loanTerm} month</div>

      <div className={"btn-container"}>
        <Link to={`/calculator/${id}`} className="blue">
          Calculate
        </Link>

        <button
          type="button"
          className="green"
          onClick={() => {
            dispatch(setModalActive());

            dispatch(setEditedBank({ bank }));
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="red"
          onClick={() => dispatch(deleteBank({ id }))}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export { BankItem };
