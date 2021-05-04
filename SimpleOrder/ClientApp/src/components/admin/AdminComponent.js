import React, { Component } from 'react';
import { CheckBoxInput } from '../controls/CheckBoxInput';

export class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.stateChange = props.stateChange || new Function();
        this.state = props.state;
    }

    stateChange = null;

    setValue = (event) => {
        this.setState(event,
            () => {
                this.stateChange(this.state);
            });
    }

    render() {
        return (
            <div>
                <CheckBoxInput
                    label="Manage Mode"
                    value={this.state.manageMode}
                    valueChange={this.setValue}
                    />
            </div>
        );
    }
}
