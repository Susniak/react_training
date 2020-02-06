import React from 'react';
import ModalComponent from '../../elements/modal';
import IconButton from '../../typography/icon-button';
import Header from "../../typography/header";
import Button from "../../typography/button";
import LabelComponent from "../../typography/label";

const emptyDay = key => <div key={key} style={{visibility: 'hidden'}}><Button type={'square black'}>.</Button></div>;
const getMonthOptions = () => {
    const options = [];

    for(let i = 1; i <= 12; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }

    return options;
};
    /**
 */
class DatepickerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "Wybierz date:",
            isOpen: false,
            year: 1990,
            month: 1,
        }
    }

    getCalculationsYear() {
        const startDate = this.props.start || new Date((new Date()).getFullYear(), 1, 0);
        const endDate = this.props.end || new Date(startDate.getFullYear() + 40, 1, 0);

        return {
            startDate,
            endDate
        }
    }

    getYearOptions() {
        const {startDate,endDate} = this.getCalculationsYear();
        const options = [];

        for(let i = startDate.getFullYear(); i < endDate.getFullYear(); i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }

        return options;
    }

    open() {
        this.setState(state => ({...state, isOpen: true}));
    }

    close() {
        this.setState(state => ({...state, isOpen: false}));
    }

    clickDay(day) {
        return $event => {
            const date = new Date(this.state.year, this.state.month - 1, day);
            this.close();
            this.setState(state => ({...state, value: date.toString()}))

            if (this.props.onChange) {
                this.props.onChange({
                    $event,
                    currentTarget: {
                        name: 'datepicker',
                        value: date
                    }
                });
            }
        }
    }

    getDayButtons() {
        const date = new Date(this.state.year, this.state.month, 0);
        const days = date.getDate();
        const buttons = [];
        const chunks = [];

        for(let currentDay = 0; currentDay < date.getDay(); currentDay++) {
            buttons.push(emptyDay(currentDay * 100))
        }

        for (let day = 1; day <= days; day++) {
            buttons.push(<Button key={day} type={'square black'} onClick={this.clickDay(day)}>{day}</Button>);
        }

        for(let currentDay = 0; currentDay < buttons.length / 7; currentDay++) {
            buttons.push(emptyDay(currentDay * 1000))
        }

        for (let chunk = 0; chunk < Math.floor(days / 7) + 1; chunk++) {
            chunks[chunk] = <div key={chunk} className={"datepicker-input__modal-row"}>{buttons.splice(0, 7)}</div>;
        }

        return chunks;
    }

    setSelect(name) {
        return ($event) => {
            $event.persist();
            this.setState(state => ({...state, [name]: $event.target.value}));
        }
    }

    render() {
        return <div className="datepicker-input">
            <div className="datepicker-input__container">
                <IconButton name="coffee" onClick={this.open.bind(this)}>
                    <LabelComponent>{this.state.value}</LabelComponent>
                </IconButton>
            </div>
            <ModalComponent open={this.state.isOpen} close={this.close.bind(this)}>
                <div className={"datepicker-input__modal"}>
                    <div className={"datepicker-input__modal-row"}>
                        <Header type="small">Wybierz date:</Header>
                    </div>
                    <div className={"datepicker-input__modal-row"}>
                        <select value={this.state.year}
                                className={"datepicker-input__modal-select"}
                                onChange={this.setSelect('year')}>
                            {this.getYearOptions()}
                        </select>
                        <select value={this.state.month}
                                className={"datepicker-input__modal-select"}
                                onChange={this.setSelect('month')}>
                            {getMonthOptions()}
                        </select>
                    </div>
                    {this.getDayButtons()}
                </div>
            </ModalComponent>
        </div>
    }
}

export default DatepickerComponent;
