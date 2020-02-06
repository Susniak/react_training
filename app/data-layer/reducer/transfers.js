import {ADD_TRANSFERS, SUBMIT_TRANSFERS} from "../actions/transfers.actions";

const initialState = [];

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SUBMIT_TRANSFERS:
            return payload;
        case ADD_TRANSFERS:
            return payload;
        default:
            return state;
    }
};
