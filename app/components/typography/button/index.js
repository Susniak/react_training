import React from 'react';

const ButtonComponent = ({children, onClick, type = 'confirm'}) => {
    const typesString = type.split(' ').map(type => `btn--${type}`).join(' ');
    return <button className={`btn ${typesString}`} onClick={onClick}>{children}</button>
};

export default ButtonComponent;
