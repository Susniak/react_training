import NotificationActions from '../actions/notifications.actions';
import CRUDReducer from '../helpers/CRUDReducer';

export default CRUDReducer(NotificationActions, 'id');
