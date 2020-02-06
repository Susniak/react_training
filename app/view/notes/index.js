import React from 'react';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
    }
};
class Notes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return "Notes";
    }
}

const NotesComponent = connect(mapStateToProps)(Notes);

export default NotesComponent;
