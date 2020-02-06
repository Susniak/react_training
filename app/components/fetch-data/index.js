import React from 'react';
import {connect} from 'react-redux';
import {registerUserPush} from "../../data-layer/actions/user-push.actions";

/**
 */
class FetchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            isLoaded: false
        };
    }

    setError(hasError) {
        this.setState(state => Object.assign({}, state, {
            hasError
        }));
    }

    setLoaded(isLoaded) {
        this.setState(state => Object.assign({}, state, {
            isLoaded
        }));
    }

    runFetch() {
        fetch(`http://localhost:1000/api/${this.props.url}`)
            .then(response => response.json())
            .then(response => {
                if(this.props.action) {
                    this.props.dispatch(this.props.action(response));
                    this.props.dispatch(registerUserPush('Dane zaladowane poprawnie.'))
                }
            })
            .catch((error) => {
                console.error(error);
                return this.setError(true);
            })
            .finally(() => this.setLoaded(true));
    }

    componentDidMount() {
        if(this.props.url && this.props.url.length > 0) {
            this.runFetch();
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return 'Spinner';
        }

        if (this.state.hasError) {
            return 'Has error in loading!'
        }

        return this.props.children;
    }
}

const FetchDataComponent = connect()(FetchData);

export default FetchDataComponent;
