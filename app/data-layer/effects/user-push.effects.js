import {put, takeEvery, delay} from 'redux-saga/effects';
import {addUserPush, REGISTER_USER_PUSH, removeUserPush} from "../actions/user-push.actions";

let id = 1;

function* create({payload}) {
    yield put(addUserPush({...payload, id}));
    yield delay(10000);
    yield put(removeUserPush(id));
    id++;
}

export default [
    takeEvery(REGISTER_USER_PUSH, create),
];
