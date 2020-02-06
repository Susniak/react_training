class Action {
    setFunctionArguments(request, response) {
        this.request = request;
        this.response = response;
    }

    getRequestData() {
        return this.request && this.request.body ? this.request.body : false;
    }

    render() {

    }

    static toFunction() {
        return (request, response) => {
            const instance = new this();

            instance.setFunctionArguments(request, response);
            instance.render();

            return instance;
        }
    }
}

export default Action;
