import React from 'react';
import GenericTableComponent from '../table';
import IconButton from "../../typography/icon-button";

const ActionsGenericTable = ({data, columns, onEdit, onDelete}) => {
    const actions = (element) => {
        return <div>
            {onEdit ? <IconButton name="coffee" onClick={() => onEdit(element)}/> : ''}
            {onDelete ? <IconButton name="coffee" onClick={() => onDelete(element)}/> : ''}
        </div>
    };

    const columnsWithAction = [...columns, {
        name: 'actions',
        title: 'Actions'
    }];

    const dataWithAction = data.map(element => ({...element, 'actions': actions(element)}));

    return <GenericTableComponent columns={columnsWithAction} data={dataWithAction}/>
};

export default ActionsGenericTable;
