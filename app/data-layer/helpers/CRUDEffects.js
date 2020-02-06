import {call, put, takeEvery} from 'redux-saga/effects';

const CRUDEffects = (backend, actions) => {
    return [
        takeEvery(actions.FETCH_CREATE, function* (action) {
            const fetchData = yield call(() => backend.create(action.payload));

            yield put(actions.add(fetchData));
        }),
        takeEvery(actions.FETCH_DELETE, function* (action) {
            backend.delete(action.payload.id);

            yield put(actions.remove(action.payload));
        }),
        takeEvery(actions.FETCH_UPDATE, function* (action) {
            const fetchData = yield call(() => backend.update(action.payload));

            yield put(actions.edit(fetchData));
        }),
    ]
};

export default CRUDEffects;
