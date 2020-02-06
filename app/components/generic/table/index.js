import React from 'react';

/**
 * Base application component
 */

const cell = (key, value) => {
    return <td className="generic-table__cell" key={key}>{value}</td>;
};

const renderCell = (data, {name}) => {
    const config = {
        value: name && data.hasOwnProperty(name) ? data[name] : '',
        key: name
    };

    return cell(config.key, config.value);
};

class GenericTableComponent extends React.Component {
    getColumns() {
        const {columns} = this.props;

        if (!columns || columns.length === 0) {
            return [];
        }

        return columns;
    }

    renderHeader() {
        return this.getColumns().map((element, key) => cell(key, element.title));
    }

    renderRow(data) {
        return this.getColumns().map((element) => renderCell(data, element));
    }

    renderRows() {
        const {data} = this.props;

        if (!data && data.length === 0) {
            return '';
        }

        return data.map((element, key) => (<tr className="generic-table__row" key={key}>{this.renderRow(element)}</tr>));
    }

    render() {
        return <table className="generic-table">
            <thead>
                <tr className="generic-table__row">{this.renderHeader()}</tr>
            </thead>
            <tbody>
                {this.renderRows()}
            </tbody>
        </table>
    }
}

export default GenericTableComponent;
