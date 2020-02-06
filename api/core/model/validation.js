import validators from './validators';
import ModelValidationError from './modelValidationError';

export default (data, fields) => {
    const errors = [];

    for (const field of fields) {
        const value = data[field.name];

        if ((field.hasOwnProperty('required') && field.required) && !validators.required(value)) {
            errors.push(new ModelValidationError(field, value, 'required'));
        } else if (validators.hasOwnProperty(field.type) && !validators[field.type](value)) {
            errors.push(new ModelValidationError(field.name, value, 'type'));
        }
    }

    return errors;
}
