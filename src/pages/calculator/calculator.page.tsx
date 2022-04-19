import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { DropDownList } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ILoan } from "../../interfaces/bank.interface";
import { calculateLoan, setSelectedBank } from "../../store/slices";
import "./calculator.page.css";

// interface ILocationState {
//   bank: IBank;
// }
// const location = useLocation();
// const { bank } = location.state as ILocationState;

const CalculatorPage: FC = () => {
  const params = useParams();
  const { bankId } = params;

  const { register, handleSubmit, reset } = useForm<{ loan: ILoan }>();
  const dispatch = useAppDispatch();

  const { selectedBank, loanResult, error, banks } = useAppSelector(
    (state) => state.bankReducer
  );

  const defaultBank =
    banks.find((item) => item.id === (bankId ? +bankId : -1)) ?? banks[0];

  useEffect(() => {
    dispatch(setSelectedBank({ bankId: bankId ? +bankId : -1 }));
  }, []);

  const onSubmitForm: SubmitHandler<{ loan: ILoan }> = (loan) => {
    dispatch(calculateLoan(loan));

    reset();
  };

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

        <DropDownList
          selectedBank={{
            bankName: defaultBank.bankName,
            id: defaultBank.id,
          }}
        />
        <button> Calculate </button>
      </form>

      <div className="loan-result-container">
        {error ? (
          <p>{error}</p>
        ) : (
          <div>
            <p>Result: {loanResult} UAH/month</p>
            <p>Term: {selectedBank.loanTerm} month</p>
            <p>First payment: </p>
          </div>
        )}
      </div>
    </>
  );
};

export { CalculatorPage };
