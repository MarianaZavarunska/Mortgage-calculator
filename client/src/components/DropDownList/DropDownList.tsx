import React, { FC } from "react";
import Select from "react-select";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IBank } from "../../interfaces/bank.interface";
import { setSelectedBank } from "../../store/slices";
import "./DropDownList.css";

const DropDownList: FC<{ selectedBank: Partial<IBank> }> = ({
  selectedBank,
}) => {
  const { bankName, id } = selectedBank;

  const dispatch = useAppDispatch();
  const { banks } = useAppSelector((state) => state.bankReducer);

  return (
    <>
      <Select
        options={banks.map((item) => ({
          value: item.id,
          label: item.bankName,
        }))}
        defaultValue={{
          value: id,
          label: bankName,
        }}
        onChange={(selectedOption) =>
          dispatch(
            setSelectedBank({
              bankId: selectedOption?.value,
            })
          )
        }
      />
    </>
  );
};

export { DropDownList };
