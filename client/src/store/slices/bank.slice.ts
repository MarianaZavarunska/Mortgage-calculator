import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

import { IBank, ILoan } from "../../interfaces/bank.interface";

interface IInitialState {
  banks: IBank[];
  editedBank: IBank;
  isModalActive: boolean;
  loanResult: number;
  selectedBank: IBank;
  error?: string;
  downPayment: string;
  initialLoan: string;
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
      id: 4,
      bankName: "OTP Bank",
      interestRate: 7.5,
      maxLoan: 4267717.42,
      minDownPayment: 25,
      loanTerm: 84,
    },
    {
      id: 5,
      bankName: "Crédit Agricole",
      interestRate: 10.72,
      maxLoan: 4449123.0,
      minDownPayment: 40,
      loanTerm: 240,
    },
  ],
  editedBank: {
    id: undefined,
    bankName: "",
    interestRate: 0,
    maxLoan: 0,
    minDownPayment: 0,
    loanTerm: 0,
  },

  isModalActive: false,
  loanResult: 0,
  selectedBank: {
    id: undefined,
    bankName: "",
    interestRate: 0,
    maxLoan: 0,
    minDownPayment: 0,
    loanTerm: 0,
  },
  error: "",
  downPayment: "",
  initialLoan: "",
};

const bankSlice = createSlice({
  name: "bankSlice",
  initialState,
  reducers: {
    editBank: (state, action: PayloadAction<{ bank: IBank }>) => {
      const index = state.banks.findIndex(
        (bank) => bank.id === action.payload.bank.id
      );

      if (index !== -1) state.banks[index] = action.payload.bank;
    },

    createBank: (state, action: PayloadAction<{ bank: IBank }>) => {
      const lastId = state.banks[state.banks.length - 1].id;

      state.banks.push({
        ...action.payload.bank,
        id: state.banks.length > 0 && lastId ? lastId + 1 : 1,
      });
    },

    deleteBank: (state, action: PayloadAction<{ id: number | undefined }>) => {
      state.banks = state.banks.filter((bank) => bank.id !== action.payload.id);
    },

    calculateLoan: (state, action: PayloadAction<{ loan: ILoan }>) => {
      const { initialLoan, downPayment } = action.payload.loan;

      const minPayment =
        (+initialLoan * state.selectedBank.minDownPayment) / 100;

      state.downPayment = downPayment;
      state.initialLoan = initialLoan;

      if (
        state.selectedBank &&
        +initialLoan < state.selectedBank.maxLoan &&
        +downPayment >= minPayment
      ) {
        const { interestRate, loanTerm } = state.selectedBank;
        const mortgage = +initialLoan - +downPayment;

        state.error = "";

        state.loanResult = Math.round(
          (mortgage *
            (interestRate / 12) *
            (1 + interestRate / 12) ** loanTerm) /
            ((1 + interestRate / 12) ** loanTerm - 1)
        );
      } else if (+initialLoan > state.selectedBank.maxLoan) {
        state.loanResult = 0;
        state.error = `Maximum loan in ${state.selectedBank.bankName} is ${state.selectedBank.maxLoan} UAH`;
      } else if (+downPayment < minPayment) {
        state.loanResult = 0;
        state.error = `Minimum down payment in ${state.selectedBank.bankName} is equal or grater than ${minPayment} UAH`;
      }
    },

    setEditedBank: (state, action: PayloadAction<{ bank: IBank }>) => {
      state.editedBank = action.payload.bank;
    },

    setModalActive: (state) => {
      state.isModalActive = !state.isModalActive;
    },

    setSelectedBank: (
      state,
      action: PayloadAction<{ bankId: number | undefined }>
    ) => {
      const bankId = action.payload.bankId ? action.payload.bankId : 0;
      state.selectedBank =
        state.banks.find((i) => i.id === bankId) ?? state.banks[0];
    },
  },
});

const bankReducer = bankSlice.reducer;

export const {
  editBank,
  createBank,
  deleteBank,
  setEditedBank,
  setModalActive,
  calculateLoan,
  setSelectedBank,
} = bankSlice.actions;

export { bankReducer };
