import React from 'react';
import Button from "../../typography/button";

/**
 */
class TimepickerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hour: 1990,
            minute: 1,
        }
    }

    setSelect(name) {
        return ($event) => {
            $event.persist();
            this.setState(state => ({...state, [name]: $event.target.value}));
        }
    }

    render() {
        return <div className="timepicker-input">

        </div>
    }
}

export default TimepickerComponent;
