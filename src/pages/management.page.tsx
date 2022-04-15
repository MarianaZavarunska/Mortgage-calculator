import React, { FC, useEffect } from "react";

import { BankItem } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleDropdown } from "../store/slices";
import "./management.page.css";

const ManagementPage: FC = () => {
  const { banks } = useAppSelector((state) => state.bankReducer);
  //   const banks = [
  //     {
  //       id: 55,
  //       bankName: "PrivatBank2",
  //       interestRate: 10.75,
  //       maxLoan: 600000,
  //       minDownPayment: 25,
  //       loanTerm: 240,
  //     },
  //     {
  //       id: 50,
  //       bankName: "PrivatBank",
  //       interestRate: 10.75,
  //       maxLoan: 600000,
  //       minDownPayment: 25,
  //       loanTerm: 240,
  //     },
  //   ];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleDropdown());
  }, []);

  return (
    <div className={"main-container"}>
      <ul className={"list-container"}>
        {banks &&
          banks.map((bank) => (
            <li key={bank.id} className={"list-item"}>
              <BankItem bank={bank} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export { ManagementPage };
