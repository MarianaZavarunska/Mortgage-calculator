import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { DropDownList } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ILoan } from "../../interfaces/bank.interface";
import { calculateLoan, sendResult, setSelectedBank } from "../../store/slices";
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

  const { selectedBank, loanResult, error, banks, downPayment, initialLoan } =
    useAppSelector((state) => state.bankReducer);

  const { user, message } = useAppSelector((state) => state.userReducer);

  const defaultBank =
    banks.find((item) => item.id === (bankId ? +bankId : -1)) ?? banks[0];

  useEffect(() => {
    dispatch(setSelectedBank({ bankId: bankId ? +bankId : -1 }));
  }, []);

  const onSubmitForm: SubmitHandler<{ loan: ILoan }> = async (loan) => {
    await dispatch(calculateLoan(loan));

    const result = {
      firstName: user?.firstName,
      email: user?.email,
      bankName: selectedBank.bankName,
      loanTerm: +selectedBank.loanTerm,
      initialLoan,
      downPayment,
      loanResult,
    };
    await dispatch(sendResult(result));

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
        ) : loanResult ? (
          <div>
            <p>InitialLoan: {initialLoan} UAH</p>
            <p>First payment: {downPayment} UAH</p>
            <p>Term: {selectedBank.loanTerm} month</p>
            <p>Result: {loanResult} UAH/month </p>
            {message && <span>({message})</span>}
          </div>
        ) : (
          <div></div>
        )}
        <div className="helper"> </div>
      </div>
    </>
  );
};

export { CalculatorPage };
