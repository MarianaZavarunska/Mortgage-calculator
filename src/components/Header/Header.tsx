import React, {FC} from 'react';

import './Header.css';

const Header:FC = () => {
    return (
        <div className={'header-container'}>
            <div className={'logo-container'}>
                <img src={ require("../../images/logo.png") } alt={'logo.png'}/>
            </div>
            <div>Mortgage Calculator</div>
        </div>
    );
};

export { Header};
