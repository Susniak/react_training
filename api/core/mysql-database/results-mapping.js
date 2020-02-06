const parseMainPart = (prefix, object) => {
    return Object.keys(object)
        .reduce((prev, key) => ({...prev, [key.replace(`${prefix}_`, '')]: object[key]}), {});
};

const groupBy = (results, name) => {
    return Object.values(results.reduce((prev, result) => {
        const pkValue = result[name];

        prev[pkValue] = prev[pkValue] ? [...prev[pkValue], result] : [result];

        return prev;
    }, {}));
};

const extractForeignValues = (tableName) => {
    return (element) => {
        return Object.keys(element).filter(key => key.indexOf(`${tableName}_`) !== -1)
            .reduce((prev, key) => ({...prev, [key]: element[key]}), {});
    };
};

const extractObjectValues = (tableName) => {
    return (element) => {
        return Object.keys(element).filter(key => key.indexOf(`${tableName}_`) === -1)
            .reduce((prev, key) => ({...prev, [key]: element[key]}), {});
    };
};

const toForeignObject = (tableName, elementsArray) => {
    const foreignObjects = elementsArray.map(extractForeignValues(tableName));

    return foreignObjects.map(element => parseMainPart(tableName, element));
};

class ResultsMapping {
    getTablesName(fields) {
        return fields.map(({model}) => {
            if (model && this.models[model]) {
                return new this.models[model]().queryBuilder.tableName;
            }

            return false;
        }).filter(value => value);
    };

    parseOneToMany(results) {
        if (this.oneToMany.length > 0) {
            return this.oneToMany.map(tableName => {
                return results.map(elementsArray => ({
                    ...(extractObjectValues(tableName)(elementsArray[0])),
                    [tableName]: toForeignObject(tableName, elementsArray)
                }));
            }).flat(1)
        }

        return results.flat(1);
    }

    parseOneToOne(results) {
        return this.oneToOne > 0 ? this.oneToOne.map(tableName => {
            return results.map(element => {
                return {
                    ...extractObjectValues(tableName)(element),
                    [tableName]: parseMainPart(tableName, extractForeignValues(tableName)(element))
                }
            });
        }).flat(1) : results;
    }

    prepareResults() {
        let parsedResults = groupBy(this.initialResults.map(element => parseMainPart(this.table, element)), this.pk);
        parsedResults = this.parseOneToMany(parsedResults);

        return this.parseOneToOne(parsedResults);
    }

    constructor(results, oneToMany, oneToOne, primaryKeyName, tableName, models) {
        this.models = models;
        this.table = tableName;
        this.pk = primaryKeyName;
        this.oneToMany = this.getTablesName(oneToMany);
        this.oneToOne = this.getTablesName(oneToOne);
        this.initialResults = results;
    }

}

export default ResultsMapping;
