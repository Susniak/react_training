import {combineReducers} from 'redux';
import notifications from './notifications';
import photoAlbums from './photo-albums';
import transfers from './transfers';
import userPush from './user-push';

export default combineReducers({
    notifications,
    transfers,
    userPush,
    photoAlbums
});
