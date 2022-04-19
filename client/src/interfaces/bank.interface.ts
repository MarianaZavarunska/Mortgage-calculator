export interface IBank {
  id?: number;
  bankName: string;
  interestRate: number;
  maxLoan: number;
  minDownPayment: number;
  loanTerm: number;
}

export interface ILoan {
  initialLoan: string;
  downPayment: string;
  selectedBank: string;
}
