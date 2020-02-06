import query from './query';
import QueryBuilder from './query-builder';
import ResultsMapping from "./results-mapping";

export default class DatabaseQueries {
    static ONE_TO_ONE = "ONE_TO_ONE";
    static ONE_TO_MANY = "ONE_TO_MANY";
    static MANY_TO_ONE = "MANY_TO_ONE";
    static MANY_TO_MANY = "MANY_TO_MANY";

    constructor(tableName, tableFields, models) {
        this.tableName = tableName;
        this.models = models;
        this.queryBuilder = new QueryBuilder(tableName, tableFields, {
            ONE_TO_ONE: DatabaseQueries.ONE_TO_ONE,
            ONE_TO_MANY: DatabaseQueries.ONE_TO_MANY,
            MANY_TO_ONE: DatabaseQueries.MANY_TO_ONE,
            MANY_TO_MANY: DatabaseQueries.MANY_TO_MANY
        }, models);
    }

    getQuery(value = false) {
        const string = value ? this.queryBuilder.get(value) : this.queryBuilder.getAll();
        const oneToMany = this.queryBuilder.foreignKeys.filter(({relation}) => relation === DatabaseQueries.ONE_TO_MANY);
        const oneToOne = this.queryBuilder.foreignKeys.filter(({relation}) => relation === DatabaseQueries.ONE_TO_ONE);
        const {name} = this.queryBuilder.primaryKey;

        return query(string).then(results => {
            const element = new ResultsMapping(results, oneToMany, oneToOne, name, this.tableName, this.models);

            return element.prepareResults();
        })
    }

    getAll() {
        return this.getQuery();
    }

    get(value) {
        return this.getQuery(value);

    }

    update(values) {
        return query(this.queryBuilder.update(values));
    }

    insert(values) {
        console.log("Query string", this.queryBuilder.insert(values));
        return query(this.queryBuilder.insert(values));
    }

    delete(value) {
        return query(this.queryBuilder.delete(value));
    }
}
