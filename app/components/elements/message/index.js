import React from 'react';

const MessageComponent = ({text, type = 'default'}) => {
    return <span className={`message message--${type}`}>{text}</span>
};

export default MessageComponent;
