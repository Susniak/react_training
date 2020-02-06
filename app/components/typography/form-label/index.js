import React from 'react';
import LabelComponent from '../label';

const FormLabelComponent = ({htmlFor, children}) => {
    return <label htmlFor={htmlFor}><LabelComponent>{children}</LabelComponent></label>
};

export default FormLabelComponent;
