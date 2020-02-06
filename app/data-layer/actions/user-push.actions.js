export const ADD_USER_PUSH = 'ADD_USER_PUSH';
export const REMOVE_USER_PUSH = 'REMOVE_USER_PUSH';
export const REGISTER_USER_PUSH = 'REGISTER_USER_PUSH';

export const addUserPush = payload => ({
    type: ADD_USER_PUSH,
    payload
});

export const removeUserPush = (id) => ({
    type: REMOVE_USER_PUSH,
    payload: id
});

export const registerUserPush = (text, type = 'info') => ({
    type: REGISTER_USER_PUSH,
    payload: {
        text,
        type
    }
});
