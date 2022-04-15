import React, { FC } from "react";

import { IBank } from "../../interfaces/bank.interface";
import "./BankItem.css";

const BankItem: FC<{ bank: IBank }> = ({ bank }) => {
  const { id, bankName, interestRate, maxLoan, minDownPayment, loanTerm } =
    bank;
  return (
    <>
      <div>{id}</div>
      <div>{bankName}</div>
      <div>{interestRate} %</div>
      <div>{maxLoan} UAH</div>
      <div>{minDownPayment} %</div>
      <div>{loanTerm} month</div>

      <div className={"btn-container"}>
        <button type="button">Calculate</button>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </>
  );
};

export { BankItem };
