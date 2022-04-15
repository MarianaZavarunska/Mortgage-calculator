import { createSlice } from "@reduxjs/toolkit";
import { IBank } from "../../interfaces/bank.interface";

interface IInitialState {
  banks: IBank[];
}

const initialState: IInitialState = {
  banks: [
    {
      id: new Date().getUTCMilliseconds(),
      bankName: "PrivatBank",
      interestRate: 10.75,
      maxLoan: 600000,
      minDownPayment: 25,
      loanTerm: 240,
    },
    {
      id: new Date().getUTCMilliseconds(),
      bankName: "Alfa-Bank",
      interestRate: 13.75,
      maxLoan: 700000,
      minDownPayment: 23,
      loanTerm: 84,
    },
    {
      id: new Date().getUTCMilliseconds(),
      bankName: "Ukreximbank",
      interestRate: 10.75,
      maxLoan: 3205815577.0,
      minDownPayment: 21,
      loanTerm: 120,
    },
    {
      id: new Date().getUTCMilliseconds(),
      bankName: "OTP Bank",
      interestRate: 7.5,
      maxLoan: 4267717.42,
      minDownPayment: 25,
      loanTerm: 84,
    },
    {
      id: new Date().getUTCMilliseconds(),
      bankName: "Crédit Agricole",
      interestRate: 10.72,
      maxLoan: 4449123.0,
      minDownPayment: 40,
      loanTerm: 240,
    },
  ],
};

const bankSlice = createSlice({
  name: "bankSlice",
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      console.log("toggle");

      state.banks = [
        {
          id: new Date().getUTCMilliseconds(),
          bankName: "PrivatBank",
          interestRate: 10.75,
          maxLoan: 600000,
          minDownPayment: 25,
          loanTerm: 240,
        },
        {
          id: new Date().getUTCMilliseconds(),
          bankName: "Alfa-Bank",
          interestRate: 13.75,
          maxLoan: 700000,
          minDownPayment: 23,
          loanTerm: 84,
        },
        {
          id: new Date().getUTCMilliseconds(),
          bankName: "Ukreximbank",
          interestRate: 10.75,
          maxLoan: 3205815577.0,
          minDownPayment: 21,
          loanTerm: 120,
        },
        {
          id: new Date().getUTCMilliseconds(),
          bankName: "OTP Bank",
          interestRate: 7.5,
          maxLoan: 4267717.42,
          minDownPayment: 25,
          loanTerm: 84,
        },
        {
          id: new Date().getUTCMilliseconds(),
          bankName: "Crédit Agricole",
          interestRate: 10.72,
          maxLoan: 4449123.0,
          minDownPayment: 40,
          loanTerm: 240,
        },
      ];
    },
  },
});

const bankReducer = bankSlice.reducer;
export const { toggleDropdown } = bankSlice.actions;

export { bankReducer };
