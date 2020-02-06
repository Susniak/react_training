import DatabaseQueries from '../mysql-database/database-queries';
import Queries from './queries';
import errorPromise from './errorPromise';

export default class CRUDController {
    constructor(model) {
        if (!model instanceof DatabaseQueries) {
            console.error('Model in CRUD Controller constructor have to be instance of DatabaseQueries.');
        }
        this.queries = new Queries(model);
    }

    getAction(name, res, resolveSuccess, ...args) {
        const unknownAction = `Action ${name} is unknown in CRUDController`;
        const promise = !!this.queries[name] ? this.queries[name].call(this.queries, ...args) :
            errorPromise(unknownAction, 500);

        return promise.then(response => {
            console.log(response);
            if (resolveSuccess) {
                res.status(200).json(response);
            }

            return response;
        }).catch(error => {
            const hasStatus = error.hasOwnProperty('status');

            res.status(hasStatus ? error.status : 400).json(hasStatus ? error.message : error);
        })
    }
}
