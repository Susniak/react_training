import React from 'react';

const HeaderComponent = ({children, type = 'regular'}) => {
    return <div className={`header header--${type}`}>
        <span className="header__text">{children}</span>
        <hr className="header__border"/>
    </div>
};

export default HeaderComponent;
