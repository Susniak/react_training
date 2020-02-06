class CRUDBackend {
    constructor(url) {
        this.url = `http://localhost:1000/api/${url}`;
    }

    create(data) {
        return fetch(this.url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(response => response.object);
    }

    read() {

    }

    update(data) {
        const {id} = data;

        return fetch(`${this.url}/${id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(response => response.object);
    }

    delete(id) {
        return fetch(`${this.url}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json());
    }
}

export default CRUDBackend;
