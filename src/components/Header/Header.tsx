import React, {FC} from 'react';

import './Header.css';

const Header:FC = () => {
    return (
        <div>
            <div>
                <img src={ require("../../images/logo.png") } alt={'logo.png'}/>
            </div>
            <div>Mortgage Calculator</div>
        </div>
    );
};

export { Header};
