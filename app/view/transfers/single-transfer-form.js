import React, {useState} from 'react';
import Accordion from "../../components/elements/accordion";
import InlineGenericFormComponent from "../../components/generic/inline-form";
import HeaderComponent from "../../components/typography/header";
import LabelComponent from "../../components/typography/label";
import StatusComponent from "../../components/elements/status";
import fields from './form-schema';

const validate = data => (Object.values(data).filter(element => element).length === Object.values(data).length);

const SingleTransferFormComponent = ({data, onChange}) => {
    const [isValid, setValid] = useState(validate(data));

    const titleNode = <div className="single-transfer-form__accordion-title">
        <HeaderComponent type="small">{data.clientTitle}</HeaderComponent>
        <LabelComponent><StatusComponent status={isValid}/></LabelComponent>
    </div>;

    const change = formData => {
        setValid(validate(formData));
        onChange(data);
    };

    return <Accordion className="single-transfer-form__accordion" title={titleNode}>
        <InlineGenericFormComponent schema={fields} data={data} onChange={change}/>
    </Accordion>
};

export default SingleTransferFormComponent;
