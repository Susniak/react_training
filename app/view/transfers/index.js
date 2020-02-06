import React from 'react';
import {connect} from "react-redux";
import SingleTransferFormComponent from "./single-transfer-form";
import {getTransfersList, submitTransfers} from "../../data-layer/actions/transfers.actions";
import ButtonComponent from "../../components/typography/button";

class Transfers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }

    };

    componentDidMount() {
        const {list, dispatch} = this.props;

        if (!list || list.length === 0) {
            dispatch(getTransfersList());
        }
    }

    changeForm(name) {
        return newData => {
            this.setState(state => ({...state, data: {...state.data, [name]: newData}}));
        }
    }

    getPropsData() {
        const {list} = this.props;

        if (!list) {
            return {};
        }

        return list.reduce((prev, current, key) => ({...prev, [key]: current}), {});
    }

    renderList() {
        const {list} = this.props;

        return !list ? '' : list.map((data, key) => {
            return <div className={"transfers__single-element"} key={key}>
                <SingleTransferFormComponent data={data} onChange={this.changeForm(key)}/>
            </div>;
        })
    }

    click() {
        this.props.dispatch(submitTransfers(Object.values({...this.getPropsData(), ...this.state.data})));
    }

    render() {
        return <div className="transfers">
            {this.renderList()}
            <div className="transfers__submit-button">
                <ButtonComponent onClick={this.click.bind(this)}>Zatwierdz</ButtonComponent>
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.transfers
    }
};

const TransfersComponent = connect(mapStateToProps)(Transfers);

export default TransfersComponent;
