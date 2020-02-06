import React from 'react';
import FormLabelComponent from "../../typography/form-label";
import ButtonComponent from "../../typography/button";
import DatepickerComponent from "../../inputs/datepicker";

/**
 * Base application component
 */
const getInput = (key, {type, onChange, value, name, title}) => {
    let editValue = value.toString() || '';

    const inputElement = () => {
        switch (type) {
            case 'hidden':
                return <input id={name} type={'hidden'} value={editValue} name={name}/>;
            case 'date':
                return <DatepickerComponent value={editValue} onChange={onChange}/>;
            case 'text':
            default:
                return <input className="generic-form__text-input" id={name} type={'text'}
                              onChange={onChange} value={editValue} name={name}/>;
        }
    };

    return <div className="generic-form__input-container" key={key}>
        {type !== 'hidden' ?  <FormLabelComponent htmlFor={name}>{title}</FormLabelComponent> : '' }
        {inputElement()}
    </div>;
};

class GenericFormComponent extends React.Component {
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
        }
    }

    getInputs() {
        const {schema} = this.props;
        const {data} = this.state;
        const getValue = (element) => data && data.hasOwnProperty(element.name) ? data[element.name] : '';

        return schema.map(element => ({...element, onChange: this.onChange(element.name), value: getValue(element)}))
            .map((element, key) => getInput(key, element));
    }

    render() {
        const save = $event => {
            $event.preventDefault();

            return this.props.save(this.state.data);
        };

        return <form className="generic-form">
            {this.getInputs()}

            <div className="generic-form__buttons">
                <ButtonComponent onClick={save}>
                    Zapisz
                </ButtonComponent>
            </div>
        </form>
    }
}

export default GenericFormComponent;
