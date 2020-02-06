class Actions {
    constructor(namespace) {
        this.CREATE = `${namespace}_CREATE`;
        this.FETCH_CREATE = `${namespace}_FETCH_CREATE`;
        this.UPDATE = `${namespace}_UPDATE`;
        this.FETCH_UPDATE = `${namespace}_FETCH_UPDATE`;
        this.DELETE = `${namespace}_DELETE`;
        this.FETCH_DELETE = `${namespace}_FETCH_DELETE`;
        this.SET = `${namespace}_SET`;
    }

    create(payload) {
        return ({
            type: this.FETCH_CREATE,
            payload
        })
    }

    add(payload) {
        return ({
            type: this.CREATE,
            payload
        })
    }

    update(payload) {
        return ({
            type: this.FETCH_UPDATE,
            payload
        })
    }

    edit(payload) {
        return ({
            type: this.UPDATE,
            payload
        })
    }

    delete(payload) {
        return ({
            type: this.FETCH_DELETE,
            payload
        })
    }

    remove(payload) {
        return ({
            type: this.DELETE,
            payload
        })
    }

    set(payload) {
        return ({
            type: this.SET,
            payload
        })
    }
}

const CRUDActions = (namespace) => new Actions(namespace);

export default CRUDActions;
