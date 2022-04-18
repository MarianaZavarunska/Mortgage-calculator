import React, { FC } from "react";
import Select from "react-select";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setBankId } from "../../store/slices";

const DropDownList: FC<{ selectedBank: string }> = ({ selectedBank }) => {
  const dispatch = useAppDispatch();
  const { banks } = useAppSelector((state) => state.bankReducer);

  const bank = banks.find((i) => i.bankName === selectedBank) ?? banks[0];

  return (
    <>
      <Select
        options={banks.map((i) => ({ value: i.id, label: i.bankName }))}
        defaultValue={{ value: bank.id, label: bank.bankName }}
        onChange={(selectedOption) =>
          dispatch(
            setBankId({ bankName: selectedOption?.label ?? banks[0].bankName })
          )
        }
      />
    </>
  );
};

export { DropDownList };
