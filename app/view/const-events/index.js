import React from 'react';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
    }
};
class ConstantEvents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return "Const Events";
    }
}

const ConstantEventsComponent = connect(mapStateToProps)(ConstantEvents);

export default ConstantEventsComponent;
