import React, { Component } from 'react';

export class CartComponentBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            cart: this.props.state.cart || {},
        };
        /* *
        this.state = {
            cart: {
                items: [
                    {
                        Description: "Testing item - Small",
                        Discount: null,
                        ItemNumber: "TEST123-1",
                        LineNumber: null,
                        Quantity: 1,
                        SubTotal: 2,
                        UnitPrice: 2,
                    },
                    {
                        Description: "Testing item - Medium",
                        Discount: null,
                        ItemNumber: "TEST123-2",
                        LineNumber: null,
                        Quantity: 1,
                        SubTotal: 3,
                        UnitPrice: 3,
                    },
                    {
                        Description: "Testing item - Large",
                        Discount: null,
                        ItemNumber: "TEST123-3",
                        LineNumber: null,
                        Quantity: 1,
                        SubTotal: 4,
                        UnitPrice: 4,
                    },
                    {
                        Description: "Just Another Item - Regular",
                        Discount: null,
                        ItemNumber: "Item2-R",
                        LineNumber: null,
                        Quantity: 1,
                        SubTotal: 9.99,
                        UnitPrice: 9.99,
                    },
                    {
                        Description: "Just Another Item - Larger",
                        Discount: null,
                        ItemNumber: "Item2-L",
                        LineNumber: null,
                        Quantity: 1,
                        SubTotal: 10.99,
                        UnitPrice: 10.99,
                    },
                    {
                        Description: "Third item - Regular",
                        Discount: null,
                        ItemNumber: "Item3XX",
                        LineNumber: null,
                        Quantity: 1,
                        SubTotal: 8.99,
                        UnitPrice: 8.99,
                    },
                    {
                        Description: "Third item - Large",
                        Discount: null,
                        ItemNumber: "SomethingElse",
                        LineNumber: null,
                        Quantity: 1,
                        SubTotal: 12.99,
                        UnitPrice: 12.99,
                    }
                ]
            }
        };
        /* */
        if (!this.state.cart.items) {
            this.state.cart.items = [];
        }

        this.state.invoice = {
            Customer: {},
            SubTotal: 0,
            Discount: 0,
            Tax: 0,
            Total: 0,
        };
        if (this.state.cart.items.length > 0) {
            this.state.cart.items.forEach(v => {
                v.Quantity = Number((v.Quantity || 0).toFixed(0));
                v.UnitPrice = Number((v.UnitPrice || 0).toFixed(2));
                v.Discount = Number((v.Discount || 0).toFixed(2));
                v.SubTotal = Number((v.SubTotal || 0).toFixed(2));

                this.state.invoice.SubTotal = Number(((
                    this.state.invoice.SubTotal +
                    v.SubTotal
                ) || 0).toFixed(2));
            });
            this.state.invoice.Total = Number(((
                this.state.invoice.SubTotal -
                this.state.invoice.Discount +
                this.state.invoice.Tax
            ) || 0).toFixed(2));
        }
    }

    render() {
        return (<div>Nothing to see</div>);
    }
}
