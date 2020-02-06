import React from 'react';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
    }
};
class Lists extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return "Const Events";
    }
}

const ListsComponent = connect(mapStateToProps)(Lists);

export default ListsComponent;
