export default class ModelValidationError {
    constructor(field, value, type) {
        this.field = field;
        this.value = value;
        this.error = type;
    }

    toString() {
        return `Field ${this.field} = ${this.value} has error type ${this.error}`;
    }
}
