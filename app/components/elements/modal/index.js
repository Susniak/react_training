import React from 'react';

/**
 */
class ModalComponent extends React.Component {
    clickOverlay($event) {
        if ($event.target === $event.currentTarget) {
            this.props.close();
        }
    }

    render() {
        return <div className={`modal modal${this.props.open ? '--open' : ''}`}>
            <div className="modal__overlay" onClick={this.clickOverlay.bind(this)}>
                <a className="modal__close-icon" href="#" onClick={() => this.props.close()}>
                    <span>X</span>
                </a>
                {this.props.children}
            </div>
        </div>
    }
}

export default ModalComponent;
