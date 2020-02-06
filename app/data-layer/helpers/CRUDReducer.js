const updateState = (state, primaryKey, newElement, index) => {
    return state.map(element => element[primaryKey] === index ? newElement : element);
};

const CRUDReducer = (CrudActions, primaryKey) => {
    const initialState = [];

    return (state = initialState, action) => {
        switch (action.type) {
            case CrudActions.SET:
                return action.payload;
            case CrudActions.CREATE:
                return [...state, action.payload];
            case CrudActions.DELETE:
                return updateState(state, primaryKey, null, action.payload[primaryKey]).filter(element => !!element);
            case CrudActions.UPDATE:
                return updateState(state, primaryKey, action.payload, action.payload[primaryKey]);
            default:
                return state;
        }
    };
};

export default CRUDReducer;
