import CRUDBackend from '../helpers/CRUDBackend';

class NotificationBackendController extends CRUDBackend {
    constructor() {
        super('notifications');
    }
}

const NotificationBackend = new NotificationBackendController();

export default NotificationBackend;
