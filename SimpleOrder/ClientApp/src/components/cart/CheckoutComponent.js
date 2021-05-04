import React from 'react';
import { CartComponentBase } from './CartComponentBase';
import { CustomerComponent } from "../customer/CustomerComponent";

export class CheckoutComponent extends CartComponentBase {
    constructor(props) {
        super(props);
        this.stateChange = props.stateChange || new Function();
        //this.state = props.state;
        if (!this.state.customer) {
            this.state.customer = {};
        }
    }

    stateChange = null;

    setValue = (event) => {
        this.setState(event,
            () => {
                //this.stateChange(this.state);
            });
    }

    submit = (event) => {
        let invoice = {
            Date: new Date(),
            Details: this.state.cart.items.slice().map(x => {
                x.Id = null;
                return x;
            }) || [],
            SubTotal: this.state.invoice.SubTotal || 0,
            Discount: this.state.invoice.Discount || 0,
            Tax: this.state.invoice.Tax || 0,
            Total: this.state.invoice.Total || 0,
            InvoiceId: null,
            Id: null,
            Customer: this.state.customer,
        };
        invoice.Details.forEach((v, i) => {
            v.LineNumber = i + 1;
        });

        let headers = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoice),
        };

        fetch("api/orders", headers)
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                document.location.href = '/catalog';
            });
    }

    render() {
        let submitDisabled = this.state.cart.items.length === 0;
        return (
            <div className="checkoutForm">
                <CustomerComponent
                    state={this.state.customer}
                    stateChange={this.setValue}
                />
                <div>
                    <button
                        onClick={this.submit}
                        disabled={submitDisabled}>
                        Submit Order
                    </button>
                </div>
                <div>
                    * Note, order is incomplete without payment.
                    <br />
                    * Payment information will be emailed to you.
                </div>
            </div>
        );
    }
}