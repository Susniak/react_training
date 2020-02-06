import { all } from 'redux-saga/effects'
import NotificationSaga from './notifications.effects';
import PhotoAlbumSaga from './photo-albums.effects';
import TransfersSaga from './transfers.effects';
import UserPushSaga from './user-push.effects';


export default function* rootSaga() {
    yield all([...NotificationSaga, ...TransfersSaga, ...UserPushSaga, ...PhotoAlbumSaga])
}
