import React, { Component } from 'react';
import { formatCurrency } from '../controls/Shared';

export class InvoiceLineItem extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
    }

    render() {
        let item = this.state;
        return (
            <div className="invoiceLineItem">
                <div className="itemNumber">{item.ItemNumber}</div>
                <div className="description">{item.Description}</div>
                <div className="unitPrice">{formatCurrency(item.UnitPrice)}</div>
                <div className="quantity">{item.Quantity}</div>
                <div className="subTotal">{formatCurrency(item.SubTotal)}</div>
            </div>
        );
    }
}
