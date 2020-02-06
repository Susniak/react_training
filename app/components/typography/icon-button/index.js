import React from 'react';
import Icon from "../../elements/icons";

const IconButton = ({name, onClick, children = ''}) => {
    return <button onClick={onClick} className="icon-button">
        {children}
        <Icon name={name}/>
    </button>;
};

export default IconButton;
