import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks";
import { IBank } from "../../interfaces/bank.interface";
import { editBank } from "../../store/slices";

const Form: FC = () => {
  const { register, handleSubmit, reset } = useForm<{ bank: Partial<IBank> }>();
  const dispatch = useAppDispatch();

  const onSubmitForm: SubmitHandler<{ bank: Partial<IBank> }> = (bank) => {
    dispatch(editBank(bank));
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <label>BankName:</label>
          <input type="text" {...register("bank.bankName")} />
        </div>

        <div>
          <label>Interest Rate:</label>
          <input type="text" {...register("bank.interestRate")} />
        </div>

        <div>
          <label>Maximum Loan:</label>
          <input type="text" {...register("bank.maxLoan")} />
        </div>

        <div>
          <label>Minimum down payment:</label>
          <input type="text" {...register("bank.minDownPayment")} />
        </div>

        <div>
          <label>Loan Term:</label>
          <input type="text" {...register("bank.loanTerm")} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export { Form };
