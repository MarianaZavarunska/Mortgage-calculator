import React, { FC } from 'react';

import { BankItem } from "../components";
import { useAppSelector } from "../hooks";
import './management.page.css';

const ManagementPage: FC = () => {
    const {banks} = useAppSelector(state => state.bankReducer);

    return (
        <div className={'main-container'}>
            <ul className={'list-container'}>
                {banks && banks.map(bank => <li className={'list-item'}><BankItem key={bank.id} bank={bank}/></li>)}
            </ul>
        </div>
    );
};

export {ManagementPage};
