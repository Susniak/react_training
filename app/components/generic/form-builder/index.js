import React from 'react';
import InputSwitchComponent from "../input-switch";

/**
 * Base application component
 */

class FormBuilderComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.prepareData()
        };
    }

    prepareData() {
        const {schema, data} = this.props;

        if (data && Object.keys(data).length > 0) {
            return data;
        }

        return schema ? schema.reduce((prev, {name, value}) => ({...prev, [name]: (value || '')}), {}) : {};
    }

    onChange(name) {
        return ($event) => {
            const data = {...this.state.data, [name]: $event.currentTarget.value};

            this.setState(state => ({...state, data}));

            if(this.props.onChange) {
                this.props.onChange(data);
            }
        }
    }

    getInputs() {
        const {schema, inputClassName} = this.props;
        const {data} = this.state;
        const getElement = element => ({
            ...element,
            onChange: this.onChange(element.name),
            value: data && data.hasOwnProperty(element.name) ? data[element.name] : '',
            className: inputClassName
        });

        return schema.map(getElement).map((element, key) => <div key={key} className="inline-generic-form__input-container">
            <InputSwitchComponent {...element}/>
        </div>);
    }

    render() {
        const {schema, className, children} = this.props;
        const childrenView = children ? children : '';

        return schema && schema.length > 0 ? <form className={className}>{this.getInputs()}{childrenView}</form> : '';
    }
}

export default FormBuilderComponent;
