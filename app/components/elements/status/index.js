import React from 'react';

const StatusComponent = ({status}) => {
    return <div className={`status-control status-control--${status ? 'green' : 'red'}`}/>
};

export default StatusComponent;
