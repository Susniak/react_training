import React from 'react';
import FormLabelComponent from "../../typography/form-label";
import DatepickerComponent from "../inline-form";

/**
 * Base application component
 */

const InputSwitchComponent = ({type, onChange, value, name, title, className}) => {
    let editValue = value.toString() || '';

    const inputElement = () => {
        switch (type) {
            case 'hidden':
                return <input id={name} type={'hidden'} value={editValue} name={name}/>;
            case 'date':
                return <DatepickerComponent value={editValue} onChange={onChange}/>;
            case 'text':
            default:
                return <input id={name} type={'text'} onChange={onChange} value={editValue} name={name}/>;
        }
    };

    return <div className={className}>
        {type !== 'hidden' ?  <FormLabelComponent htmlFor={name}>{title}</FormLabelComponent> : '' }
        {inputElement()}
    </div>;
};

export default InputSwitchComponent;
