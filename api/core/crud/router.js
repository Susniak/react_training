import {Router} from 'express';
import BodyParser from 'body-parser';
import CrudController from './controller';

const getKey = ({params}, key) => (params && params.hasOwnProperty(key)) ? params[key] : null;

export default (model) => {
    const controller = new CrudController(model);
    const router = new Router();
    const jsonBodyParser = BodyParser.json();

    router.get('', (req, res) => {
        controller.getAction('readAll', res, true);
    });

    router.put('', jsonBodyParser, (req, res) => {
        const body = req.body;
        controller.getAction('create', res, false, body).then(response => {
            if (response && response.insertId) {
                console.log(body, response)
                res.status(200).json({...response, object: {...body, id: response.insertId}});
            } else {
                console.log(body, response, {test: "Stop"})
                res.status(500);
            }
        })
    });

    router.get('/:id', (req, res) => {
        const key = getKey(req, 'id');
        if (!key) {
            return res.status(400);
        }

        controller.getAction('readSingle', res, false, key).then((response) => {
            const foundData = Array.isArray(response) && response.length > 0;

            res.status(foundData ? 200 : 404).json(foundData ? response[0] : {});
        })
    });

    router.post('/:id', jsonBodyParser, (req, res) => {
        const body = req.body;
        const key = getKey(req, 'id');
        if (!key) {
            return res.status(400);
        }

        controller.getAction('update', res, false, key, req.body).then(response => {
            res.status(200).json({...response, object: body});
        })
    });

    router.delete('/:id', (req, res) => {
        const key = getKey(req, 'id');
        if (!key) {
            return res.status(400);
        }

        controller.getAction('delete', res, true, key);
    });

    return router;
}
