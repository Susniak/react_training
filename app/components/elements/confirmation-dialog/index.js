import React from 'react';
import HeaderComponent from "../../typography/header";
import LabelComponent from "../../typography/label";
import ButtonComponent from "../../typography/button";

const ConfirmationDialog = ({children, cancel, confirm}) => {
    return <div className="confirmation-dialog">
        <div className="confirmation-dialog__header">
            <HeaderComponent>Potwierdzenie</HeaderComponent>
        </div>
        <div className="confirmation-dialog__content">
            <LabelComponent>{children}</LabelComponent>
        </div>
        <div className="confirmation-dialog__footer">
            <ButtonComponent onClick={cancel}>No</ButtonComponent>
            <ButtonComponent onClick={confirm}>Yes</ButtonComponent>
        </div>
    </div>
};

export default ConfirmationDialog;
