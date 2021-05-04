import React from 'react';
import { CartComponentBase } from './CartComponentBase';
import { InvoiceLineItem } from '../invoice/InvoiceLineItem';
import { InvoiceLineItemHeader } from '../invoice/InvoiceLineItemHeader';
import { CheckoutComponent } from './CheckoutComponent';
import { formatCurrency } from '../controls/Shared';

export class CartComponent extends CartComponentBase {
    constructor(props) {
        super(props);
    }
        
    render() {
        if (this.state.cart.items.length > 0) {
            return (
                <div className="cart">
                    <div className="cartInvoiceSection">
                        <div className="invoiceItemsSection">
                            <InvoiceLineItemHeader />
                            {(this.state.cart.items || []).map(item =>
                                <div key={item.Description}>
                                    <div className="invoiceItemGrid">
                                        <InvoiceLineItem state={item} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="invoiceSummarySection">
                            <label>Sub Total</label>
                            <span>{formatCurrency(this.state.invoice.SubTotal)}</span>
                            <label>Discount</label>
                            <span>{formatCurrency(this.state.invoice.Discount)}</span>
                            <label>Tax</label>
                            <span>{formatCurrency(this.state.invoice.Tax)}</span>
                            <label>Total</label>
                            <span>{formatCurrency(this.state.invoice.Total)}</span>
                        </div>
                    </div>
                    <div className="cartCustomerInfoSection">
                        <div>
                            Ready to checkout? Fill this out and submit*
                        </div>
                        <CheckoutComponent state={this.state} />
                    </div>
                </div>
            );
        }
        else {
            return super.render();
        }
    }
}