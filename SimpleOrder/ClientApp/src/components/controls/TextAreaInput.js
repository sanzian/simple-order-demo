import React, { Component } from 'react';
import { setName } from './Shared';

export class TextAreaInput extends Component {
    constructor(props) {
        super(props);
        this.valueChange = props.onChange || new Function();
        setName(this, props.label);
        this.inputProps = props.inputProps || {};
        this.state = { value: props.value || "" };
    }

    valueChange = null;

    change = (event) => {
        this.setState({ value: event.currentTarget.value },
            () => {
                this.valueChange({ [this.name]: this.state.value });
            });
    }

    render() {
        let props = {
            name: this.name,
            //style: { verticalAlign: 'top' },
            disabled: this.props.disabled ? 'disabled' : undefined,
            onChange: this.change,
            value: this.state.value,
            ...this.inputProps,
        };
        let field = <textarea {...props}></textarea>;

        return (
            <div className="textAreaInput">
                <label>
                    <div className="label">{this.props.label}</div>
                    <div className="content">{field}</div>
                </label>
            </div>
        );
    }
}
