import React from 'react';
import MessageComponent from "../message";
import {connect} from "react-redux";
import {removeUserPush} from "../../../data-layer/actions/user-push.actions";

const mapStateToProps = state => {
    return {
        list: state.userPush
    }
};

class UserPushes extends React.Component {
    removePush(id) {
        return () => {
            this.props.dispatch(removeUserPush(id));
        }
    }

    getElement({text, type, id}) {
        return <div className="user-push" onClick={this.removePush(id)}>
            <MessageComponent type={type} text={text}/>
        </div>
    }

    render() {
        return <div className="user-push__single-push">
            {this.props.list.map(element => this.getElement(element))}
        </div>
    }
}

const UserPushesComponent = connect(mapStateToProps)(UserPushes);
export default UserPushesComponent;
