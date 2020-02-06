import validation from '../model/validation';
import errorPromise from "./errorPromise";
import models from '../../app/model';

export default class Queries {
    constructor(model) {
        this.model = new model(models);
        this.tableFields = this.model.queryBuilder.getFieldsWithoutPrimaryKey(this.model.queryBuilder.tableFields);
        this.primaryKey = this.model.queryBuilder.primaryKey;
    }

    create(data) {
        const validationArray = validation(data, this.tableFields).map(el => el.toString()).join('.\n');
        const validationStatus = validationArray.length === 0;

        if (!validationStatus) {
            return errorPromise('Validation error ' + validationArray, 400);
        }

        return this.model.insert(data);
    }

    readAll() {
        return this.model.getAll();
    }

    readSingle(id) {
        return this.model.get(id);
    }

    update(id, data) {
        const validationArray = validation(data, this.tableFields);
        const validationStatus = validationArray.length === 0;
        const updateData = Object.assign({}, data, {
            [this.primaryKey]: id
        });

        if (!validationStatus) {
            return errorPromise('Validation error ' + validationArray.toString(), 400);
        }

        return this.model.update(updateData)
    }

    delete(id) {
        return this.model.delete(id);
    }
};
