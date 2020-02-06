import {call, put, takeEvery} from 'redux-saga/effects';
import {addTransfers, FETCH_TRANSFERS, SUBMIT_TRANSFERS} from "../actions/transfers.actions";
import {registerUserPush} from "../actions/user-push.actions";

const url = 'http://localhost:1000/api/transfers';

function* get() {
    const request = fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
        .then(response => response)
        .catch(() => []);
    const fetchData = yield call(() => request);

    if (fetchData.length > 0) {
        yield put(addTransfers(fetchData));
    } else {
        yield put(registerUserPush('Nie mozna zaladowac tranferow', 'error'));
    }
}

function* submit(action) {
    const request = fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    }).then(response => response.status === 200).catch(() => false);
    const fetchData = yield call(() => request);

    if (fetchData) {
        yield put(registerUserPush('Utworzono plik!', 'success'));
    } else {
        yield put(registerUserPush('Nie mozna zapisac tranferow', 'error'));
    }
}


export default [
    takeEvery(FETCH_TRANSFERS, get),
    takeEvery(SUBMIT_TRANSFERS, submit),
];
