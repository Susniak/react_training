import notificationRouter from './notification';
import userRouter from './user';
import transferRouter from './transfer';
import healthCheckRouter from './health-check';
import photoAlbumRouter from './photo-album';

const routes = [
    {
        path: 'notifications',
        controller: notificationRouter
    },
    {
        path: 'health',
        controller: healthCheckRouter
    },
    {
        path: 'transfers',
        controller: transferRouter
    },
    {
        path: 'users',
        controller: userRouter
    },
    {
        path: 'photo-albums',
        controller: photoAlbumRouter
    }
];

export default routes;
