import React, {useState} from 'react';

const Accordion = ({children, title, className, isVisible=false}) => {
    const [visible, setVisible] = useState(isVisible);

    return <div className={`accordion ${visible ? 'accordion--open' : ''} ${className}`}>
        <div className="accordion__top" onClick={() => setVisible(!visible)}>
                 {title}
        </div>
        <div className="accordion__bottom">
            {children}
        </div>
    </div>
};

export default Accordion;
