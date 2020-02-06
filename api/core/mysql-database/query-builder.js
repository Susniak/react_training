const fieldName = name => `\`${name}\``;

const detectFields = (tableFields) => {
    const addFieldToObject = (prev, field) => {
        if (field.primaryKey) {
            prev.primaryKey = field;
        } else {
            prev.foreignKeys.push(field);
        }

        return prev;
    };

    return tableFields.filter(field => field.primaryKey || field.foreignKey).reduce(addFieldToObject, {
        foreignKeys: []
    });
};

const convertValue = (value, type) => {
    console.log('convertBalue', value, type);
    if (value) {
        switch (type) {
            case 'number':
                return Number(value);
            case 'date':
                if (!(value instanceof Date)) {
                    value = (new Date((value || '').toString()));
                }
                return `\'${value.toMysqlFormat()}\'`;
            case 'string':
            default:
                return `'${value.toString()}'`;
        }
    }
    return '';
};

const getJoinQuery = (currentTable, foreignTable, foreignKey, name) =>
    `LEFT JOIN ${fieldName(foreignTable)} as ${foreignTable} ON ${currentTable}.${name} = ${foreignTable}.${foreignKey}`;

const getFieldsString = (table, fields) => fields.map(field => `${table}.${field} ${table}_${field}`).join(', ');


class QueryBuilder {
    constructor(tableName, tableFields, relationsType, models) {
        const {foreignKeys, primaryKey} = detectFields(tableFields);
        const isNotForeign = field => {
            return !field.foreignKey;
        };

        this.tableFields = tableFields;
        this.tableName = tableName;
        this.foreignKeys = foreignKeys;
        this.relationsType = relationsType;
        this.models = models;
        this.tableFieldsName = tableFields.filter(isNotForeign).map(element => element.name);
        this.tableFieldsWithoutPrimaryKey = this.getFieldsWithoutPrimaryKey(tableFields.map(({name}) => name));
        this.primaryKey = primaryKey;
        this.fieldsString = getFieldsString(this.tableName, this.tableFieldsName);
    }

    getAll() {
        let joins = [];
        let selectFields = [this.fieldsString];

        if (this.foreignKeys && this.foreignKeys.length > 0) {
            const {tables, fields} = this.foreignKeys.filter(({model}) => model && this.models.hasOwnProperty(model))
                .map(({model, relation, name}) => {
                    const {tableName, primaryKey, fieldsString} = (new this.models[model]()).queryBuilder;
                    const isRelation = relation === this.relationsType.ONE_TO_MANY;

                    return {
                        table: this.tableName,
                        foreign: tableName,
                        name: isRelation ? name : primaryKey.name,
                        primary: isRelation ? this.primaryKey.name : name,
                        fieldsString
                    }
                })
                .reduce((prev, {table, foreign, name, primary, fieldsString}) => ({
                    fields: [...(prev.fields || []), getJoinQuery(table, foreign, name, primary)],
                    tables: [...(prev.tables || []), fieldsString]
                }), {});

            selectFields = [this.fieldsString, ...tables];
            joins = fields;
        }

        return [`SELECT ${selectFields.join(', ')} FROM ${this.tableName}`, ...joins].join(' ');
    }

    get(value) {
        return [this.getAll(), `WHERE ${fieldName(this.primaryKey)} = ${value}`].join(' ');
    }

    update(values) {
        const keysPossibleToUse = this.getFieldsWithoutKeys(values);
        const convertedValues = this.getFieldsValueString(keysPossibleToUse, values);
        const convertToKeyValue = key => `${fieldName(key)} = ${convertedValues[key]}`;
        const valuesToUpdate = Object.keys(convertedValues).map(convertToKeyValue).join(', ');

        return [`UPDATE ${this.tableName}`, `SET ${valuesToUpdate}`,
            `WHERE ${fieldName(this.primaryKey)} = ${values[this.primaryKey]}`].join(' ');
    }

    insert(values) {
        const fields = this.tableFieldsWithoutPrimaryKey.map(field => fieldName(field)).join(', ');
        const stringValues = this.getInsertValuesString(values);
        console.log("insert", values, stringValues);

        return `INSERT INTO ${this.tableName} (${fields}) VALUES (${stringValues})`;
    }

    delete(value) {
        return `DELETE FROM ${this.tableName} WHERE ${fieldName(this.primaryKey)} = ${value}`;
    }

    getFieldsValueString(array, values) {
        console.log('getFieldsValueString', [...array], {...values})
        const getType = name => {
            console.log('getType', name, this.tableFieldsName);
            const field = this.tableFieldsName.find(element => element.name === name);

            if (field) {
                return field.type;
            }
        };
        const getValue = field => convertValue(values[field], getType(field));

        return array.reduce((prev, field) => ({...prev, [field]: getValue(field)}));
    }

    getFieldsWithoutPrimaryKey(fields) {
        return fields.filter(field => field.primaryKey);
    }

    getFieldsWithoutKeys(fields) {
        return fields.filter(field => !field.foreignKey && !field.primaryKey);
    }

    getInsertValuesString(values) {
        console.log('getInsertValuesString', {...this.tableFieldsWithoutPrimaryKey})
        const valuesObject = this.getFieldsValueString(this.tableFieldsWithoutPrimaryKey, values);

        return Object.values(valuesObject).join(', ');
    }
}

export default QueryBuilder;
