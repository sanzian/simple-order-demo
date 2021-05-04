import React, { Component } from 'react';

export class InvoiceLineItemHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="invoiceLineItemHeader">
                <div className="itemNumberHeader">Item Number</div>
                <div className="descriptionHeader">Description</div>
                <div className="unitPriceHeader">Unit Price</div>
                <div className="quantityHeader">Quantity</div>
                <div className="subTotalHeader">Sub Total</div>
            </div>
        );
    }
}
