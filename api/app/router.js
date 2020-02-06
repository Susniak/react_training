import express from 'express';
import routes from './controllers/routes.js';

const router = new express.Router();

routes.forEach(({path, controller}) => {
    router.use(`/${path}`, controller)
});

export default router;
