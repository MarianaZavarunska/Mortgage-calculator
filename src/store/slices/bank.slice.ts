import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IBank, ILoan } from "../../interfaces/bank.interface";

interface IInitialState {
  banks: IBank[];
  editedBank: IBank;
  isModalActive: boolean;
  loanResult: number;
  selectedBankName: string;
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
  selectedBankName: "",
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
      const { initialLoan, interestRate, loanTerm } = action.payload.loan;

      state.loanResult =
        (+initialLoan *
          (interestRate / 12) *
          (1 + interestRate / 12) ** loanTerm) /
        ((1 + interestRate / 12) ** loanTerm - 1);
    },

    setEditedBank: (state, action: PayloadAction<{ bank: IBank }>) => {
      state.editedBank = action.payload.bank;
    },

    setModalActive: (state) => {
      state.isModalActive = !state.isModalActive;
    },

    setBankId: (state, action: PayloadAction<{ bankName: string }>) => {
      state.selectedBankName = action.payload.bankName;
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
  setBankId,
} = bankSlice.actions;

export { bankReducer };
