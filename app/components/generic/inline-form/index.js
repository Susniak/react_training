import React from 'react';
import FormBuilderComponent from "../form-builder";

/**
 * Base application component
 */

const InlineGenericFormComponent = ({schema, data, onChange}) => {
    return schema && schema.length > 0 ? <FormBuilderComponent
        className="inline-generic-form"
        schema={schema}
        data={data}
        onChange={onChange}
        inputClassName="inline-generic-form__input"/> : '';
};

export default InlineGenericFormComponent;

