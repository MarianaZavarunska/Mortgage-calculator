import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IBank } from "../../interfaces/bank.interface";
import { createBank, editBank, setModalActive } from "../../store/slices";
import "./Form.css";

const Form: FC = () => {
  const { register, handleSubmit, setValue, reset } = useForm<{
    bank: IBank;
  }>();
  const { editedBank } = useAppSelector((state) => state.bankReducer);

  const { id, bankName, interestRate, maxLoan, minDownPayment, loanTerm } =
    editedBank;

  const dispatch = useAppDispatch();

  const onSubmitForm: SubmitHandler<{ bank: IBank }> = (bank) => {
    if (editedBank.id) {
      bank.bank.id = editedBank.id;

      dispatch(editBank(bank));
    } else {
      dispatch(createBank(bank));
    }

    dispatch(setModalActive());
    reset();
  };

  useEffect(() => {
    setValue("bank.bankName", bankName);
    setValue("bank.interestRate", interestRate);
    setValue("bank.maxLoan", maxLoan);
    setValue("bank.minDownPayment", minDownPayment);
    setValue("bank.loanTerm", loanTerm);
  }, [id]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <label>BankName:</label>
          <input type="text" {...register("bank.bankName")} />
        </div>

        <div>
          <label>Interest Rate: (%)</label>
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
          <label>Loan Term: (month)</label>
          <input type="text" {...register("bank.loanTerm")} />
        </div>
        <button>{id ? "Edit" : "Create"}</button>
      </form>
    </div>
  );
};

export { Form };
