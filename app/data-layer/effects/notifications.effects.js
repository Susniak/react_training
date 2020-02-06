import CRUDEffects from '../helpers/CRUDEffects';
import NotificationAction from '../actions/notifications.actions';
import NotificationBackend from '../backend-controllers/notifications.backend';

export default CRUDEffects(NotificationBackend, NotificationAction);
