import React, { Component } from 'react';
import { setName } from './Shared';

export class CheckBoxInput extends Component {
    constructor(props) {
        super(props);
        this.valueChange = props.valueChange || new Function();
        setName(this, this.props.label);
        this.inputProps = this.props.inputProps || {};
        this.state = { value: this.props.value || false };
    }

    valueChange = null;

    change = (event) => {
        this.setState({ value: event.currentTarget.checked },
            () => {
                this.valueChange({ [this.name]: this.state.value });
            });
    }

    render() {
        let props = {
            name: this.name,
            type: "checkbox",
            disabled: this.props.disabled ? 'disabled' : undefined,
            onClick: this.change,
            defaultChecked: this.state.value,
            ...this.inputProps,
        };
        
        let field = <input {...props} />;

        return (
            <div className="checkBoxInput">
                <label>
                    <div className="content">{field}</div>
                    <div className="label">{this.props.label}</div>
                </label>
            </div>
        );
    }
}
