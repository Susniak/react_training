const isNumber = (value) => !isNaN(Number.parseFloat((value || '').toString()));
const isDate = (value) => value instanceof Date || !isNaN((new Date(value)).valueOf());
const isNotEmpty = (value) => value.toString().length > 0;

export default {
    'number': isNumber,
    'date': isDate,
    'required': isNotEmpty
};
