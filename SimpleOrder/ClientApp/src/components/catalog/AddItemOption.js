import React, { Component } from 'react';
import { TextInput } from '../controls/TextInput';
import { NumberInput } from '../controls/NumberInput';

export class AddItemOption extends Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange || new Function();
        this.state = props.value || {};
    }

    onChange = null;

    change = (event) => {
        this.setState(event,
            () => {
                this.onChange(this.state);
            });
    }

    render() {
        return (
            <div>
                <TextInput
                    label="Item Number (suffix)"
                    name="itemNumber"
                    value={this.state.itemNumber}
                    valueChange={this.change}
                    disabled={this.props.disabled}
                />
                <TextInput
                    label="Name"
                    value={this.state.name}
                    valueChange={this.change}
                    disabled={this.props.disabled}
                />
                <NumberInput
                    label="Price"
                    value={this.state.price}
                    valueChange={this.change}
                    disabled={this.props.disabled}
                    inputProps={{
                        min: 0,
                    }}
                />
                <NumberInput
                    label="Sort Order"
                    value={this.state.sortOrder}
                    valueChange={this.change}
                    disabled={this.props.disabled}
                    inputProps={{
                        min: 0,
                    }}
                />
            </div>
        );
    }
}
