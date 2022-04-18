import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { DropDownList } from "../../components";

import { useAppDispatch } from "../../hooks";
import { IBank, ILoan } from "../../interfaces/bank.interface";
import "./calculator.page.css";

interface ILocationState {
  bank: IBank;
}

const CalculatorPage: FC = () => {
  const location = useLocation();
  const { bank } = location.state as ILocationState;
  const { register, handleSubmit, reset } = useForm<{ loan: ILoan }>();
  const dispatch = useAppDispatch();

  // const { id, bankName, interestRate, maxLoan, minDownPayment, loanTerm } =
  //   bank;

  const onSubmitForm: SubmitHandler<{ loan: ILoan }> = (loan) => {};

  return (
    <>
      <h3>Calculate monthly payment</h3>
      <form onSubmit={handleSubmit(onSubmitForm)} className="calculate-form">
        <div>
          <label>Initial loan:</label>
          <input type="text" {...register("loan.initialLoan")} />
        </div>

        <div>
          <label>Down payment :</label>
          <input type="text" {...register("loan.downPayment")} />
        </div>

        <DropDownList selectedBank={bank.bankName} />
        <button> Calculate </button>
      </form>
      {/* <div>{id}</div>
      <div>{bankName}</div>
      <div>{interestRate} %</div>
      <div>{maxLoan} UAH</div>
      <div>{minDownPayment} %</div>
      <div>{loanTerm} month</div> */}
    </>
  );
};

export { CalculatorPage };
