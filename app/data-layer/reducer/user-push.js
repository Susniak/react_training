import {ADD_USER_PUSH, REMOVE_USER_PUSH} from "../actions/user-push.actions";

const initialState = [];

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_USER_PUSH:
            return [...state, payload];
        case REMOVE_USER_PUSH:
            return state.filter(({id}) => id !== payload);
        default:
            return state;
    }
};
