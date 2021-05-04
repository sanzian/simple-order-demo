import React, { Component } from 'react';
import { setName } from './Shared';

export class NumberInput extends Component {
    constructor(props) {
        super(props);
        this.valueChange = props.valueChange || new Function();
        setName(this, props.label);
        this.inputProps = props.inputProps || {};
        this.state = { value: Number(props.value || "") };
    }

    valueChange = null;

    change = (event) => {
        this.setState({ value: Number((event.target.value || "").trim()) },
            () => {
                this.valueChange({ [this.name]: this.state.value });
            });
    }

    render() {
        let props = {
            name: this.name,
            type: "number",
            disabled: this.props.disabled ? 'disabled' : undefined,
            onChange: this.change,
            value: this.state.value,
            ...this.inputProps,
        };
        let field = <input {...props} />;

        return (
            <div className="numberInput">
                <label>
                    <div className="label">{this.props.label}</div>
                    <div className="content">{field}</div>
                </label>
            </div>
        );
    }
}
