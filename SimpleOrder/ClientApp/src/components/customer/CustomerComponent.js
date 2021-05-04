import React, { Component } from 'react';
import { TextInput } from '../controls/TextInput';

export class CustomerComponent extends Component {
    constructor(props) {
        super(props);
        this.stateChange = props.stateChange || new Function();
        this.state = props.state || {};
    }

    stateChange = null;

    setValue = (event) => {
        this.setState(event,
            () => {
                let customerInfo = {
                    firstName: this.state.firstName || null,
                    lastName: this.state.lastName || null,
                    phoneNumber: this.state.phoneNumber || null,
                    emailAddress: this.state.emailAddress || null,
                };
                this.stateChange({ customer: customerInfo });
            });
    }

    render() {
        return (
            <div className="customerInformation">
                <h4>Customer Information</h4>
                <TextInput
                    label="First Name"
                    value={this.state.firstName}
                    valueChange={this.setValue}
                />
                <TextInput
                    label="Last Name"
                    value={this.state.lastName}
                    valueChange={this.setValue}
                />
                <TextInput
                    label="Phone"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    valueChange={this.setValue}
                />
                <TextInput
                    label="Email"
                    name="emailAddress"
                    value={this.state.emailAddress}
                    valueChange={this.setValue}
                />
            </div>
        );
    }
}