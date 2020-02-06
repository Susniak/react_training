export const FETCH_TRANSFERS = 'FETCH_TRANSFERS';
export const ADD_TRANSFERS = 'ADD_TRANSFERS';
export const SUBMIT_TRANSFERS = 'SUBMIT_TRANSFERS';

export const getTransfersList = () => ({
    type: FETCH_TRANSFERS
});

export const addTransfers = (payload) => ({
    type: ADD_TRANSFERS,
    payload
});

export const submitTransfers = (payload) => ({
    type: SUBMIT_TRANSFERS,
    payload
});
