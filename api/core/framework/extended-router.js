import {Router} from 'express';
import BodyParser from 'body-parser';

export default class ExtendedRouter {
    constructor() {
        this.routerFunc = new Router();
    }

    getAction(url, action) {
        this.routerFunc.get(url, action.toFunction());
    }

    postAction(url, action) {
        this.routerFunc.post(url, BodyParser.json(), action.toFunction());
    }

    toFunction() {
        return this.routerFunc;
    }
}
