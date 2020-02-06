import React from 'react';
import {connect} from "react-redux";

import NotificationActions from "../../data-layer/actions/notifications.actions";

import GenericActionsTableComponent from '../../components/generic/actions-table';
import HeaderComponent from '../../components/typography/header';
import ButtonComponent from "../../components/typography/button";
import FetchDataComponent from '../../components/fetch-data';
import ModalComponent from "../../components/elements/modal";
import ConfirmationDialog from "../../components/elements/confirmation-dialog";
import GenericFormComponent from "../../components/generic/form";

const config = {
    fields: [
        {
            name: 'title',
            title: 'Tytul powiadomienia',
            visible: true,
            type: 'text'
        },
        {
            name: 'date',
            title: 'Data powiadomienia',
            type: 'date',
            visible: true,
            value: (new Date()).toString()
        },
        {
            name: 'user_id',
            type: 'hidden',
            visible: false,
            value: 1
        }
    ],
    actions: NotificationActions,
    fetchUrl: 'notifications',
    bemClass: 'notifications',
    texts: {
        removeConfirmation: 'Czy na pewno chcesz usunac te powiadomienie?',
        add: 'Dodawanie powiadomienia',
        edit: 'Edytowanie powiadomienia',
        title: 'Powiadomienia'
    },
    mapStateToProps: (state) => {
        return {
            listData: state.notifications
        }
    }
};

class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditOpen: false,
            isNewOpen: false,
            isDeleteOpen: false,
            currentElement: null
        }
    }

    onClose() {
        this.setState(() => ({
            isEditOpen: false,
            isNewOpen: false,
            isDeleteOpen: false,
            currentElement: null
        }));
    }

    close() {
        return () => this.onClose();
    }

    open(field, element) {
        this.setState(state => ({...state, [field]: true, currentElement: element}));
    }

    delete() {
        this.props.dispatch(config.actions.delete(this.state.currentElement));
        this.onClose();
    }

    edit(formData) {
        this.props.dispatch(config.actions.update({...this.state.currentElement, ...formData}));
        this.onClose();
    }

    create(formData) {
        this.props.dispatch(config.actions.create(formData));
        this.onClose();
    }

    getEditModalContent() {
        const {currentElement, isEditOpen} = this.state;

        return currentElement && isEditOpen ?
            <div className="modal-form">
                <div className="modal-form__header">
                    <HeaderComponent>{config.texts.edit} {currentElement.title}</HeaderComponent>
                </div>
                <GenericFormComponent schema={config.fields} data={currentElement} save={this.edit.bind(this)}/>
            </div> : '';
    }

    getCreationModalContent() {
        return this.state.isNewOpen ? <div className="modal-form">
            <div className="modal-form__header">
                <HeaderComponent>{config.texts.add}</HeaderComponent>
            </div>
            <GenericFormComponent data={{}} schema={config.fields} save={this.create.bind(this)}/>
        </div> : '';
    }

    getDeleteModalContent() {
        return this.state.isDeleteOpen ? <ConfirmationDialog cancel={this.close('isDeleteOpen')}
            confirm={this.delete.bind(this)}>
            {config.texts.removeConfirmation}
        </ConfirmationDialog> : '';
    }

    isModalOpen() {
        const {isNewOpen, isEditOpen, isDeleteOpen} = this.state;

        return isDeleteOpen || isEditOpen || isNewOpen;
    }

    render() {
        return <div className={config.bemClass}>
            <HeaderComponent>{config.texts.title}</HeaderComponent>
            <ButtonComponent onClick={() => this.open('isNewOpen')}>Add new</ButtonComponent>
            <FetchDataComponent url={config.fetchUrl} action={config.actions.set.bind(NotificationActions)}>
                <GenericActionsTableComponent
                    onDelete={element => this.open('isDeleteOpen', element)}
                    onEdit={element => this.open('isEditOpen', element)}
                    data={this.props.listData}
                    columns={config.fields}/>
            </FetchDataComponent>
            <ModalComponent open={this.isModalOpen()} close={this.close()}>
                {this.getCreationModalContent()}
                {this.getEditModalContent()}
                {this.getDeleteModalContent()}
            </ModalComponent>
        </div>
    }
}

const NotificationsComponent = connect(config.mapStateToProps)(Notifications);

export default NotificationsComponent;
