import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBank } from "../../interfaces/bank.interface";

interface IInitialState {
  banks: IBank[];
  isModalActive: boolean;
}

const initialState: IInitialState = {
  banks: [
    {
      id: 1,
      bankName: "PrivatBank",
      interestRate: 10.75,
      maxLoan: 600000,
      minDownPayment: 25,
      loanTerm: 240,
    },
    {
      id: 2,
      bankName: "Alfa-Bank",
      interestRate: 13.75,
      maxLoan: 700000,
      minDownPayment: 23,
      loanTerm: 84,
    },
    {
      id: 3,
      bankName: "Ukreximbank",
      interestRate: 10.75,
      maxLoan: 3205815577.0,
      minDownPayment: 21,
      loanTerm: 120,
    },
    {
      id: 3,
      bankName: "OTP Bank",
      interestRate: 7.5,
      maxLoan: 4267717.42,
      minDownPayment: 25,
      loanTerm: 84,
    },
    {
      id: 4,
      bankName: "Crédit Agricole",
      interestRate: 10.72,
      maxLoan: 4449123.0,
      minDownPayment: 40,
      loanTerm: 240,
    },
  ],
  isModalActive: false,
};

const bankSlice = createSlice({
  name: "bankSlice",
  initialState,
  reducers: {
    editBank: (state, action: PayloadAction<{ bank: Partial<IBank> }>) => {},

    createBank: (state, action: PayloadAction<{ bank: Partial<IBank> }>) => {},

    setModalActive: (state) => {
      state.isModalActive = !state.isModalActive;
    },
  },
});

const bankReducer = bankSlice.reducer;

export const { editBank, createBank, setModalActive } = bankSlice.actions;

export { bankReducer };
