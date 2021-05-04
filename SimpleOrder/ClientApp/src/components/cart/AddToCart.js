import React, { Component } from 'react';
import { NumberInput } from '../controls/NumberInput';
import { browserNotSupported } from '../controls/Shared';

export class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange || new Function();
        this.state = props.state || {};
        this.state.quantity = 1;
    }

    onChange = null;

    setValue = (event) => {
        this.setState(event);
    }

    addToCart = () => {
        let item = this.state.item;
        let option = this.state.option || {};
        let lineItem = {
            LineNumber: null,
            ItemNumber: ((item.itemNumber || "") + (option.itemNumber || "")).trim(),
            Description: `${item.name} - ${option.name}`,
            UnitPrice: option.price,
            Quantity: this.state.quantity,
            Discount: null,
            SubTotal: option.price * this.state.quantity,
        };

        let items = this.state.cart.items || [];
        let existing = items.find(x => x.ItemNumber === lineItem.ItemNumber);
        if (existing != undefined) {
            existing.Quantity += lineItem.Quantity;
            existing.SubTotal = existing.UnitPrice * existing.Quantity;
        }
        else {
            items.push(lineItem);
        }
        let cart = this.state.cart;
        cart.items = items;

        this.setState({ cart: cart });
    }

    removeItem(event) {
        return () => {
            let cart = this.state.cart;
            cart.items = cart.items.filter(x => x.ItemNumber !== event.ItemNumber);
            this.setState({ cart: cart });
        };
    }

    render() {
        browserNotSupported();
        let existing = (this.state.cart.items || []).find(x => x.ItemNumber === (this.state.item.itemNumber + this.state.option.itemNumber));
        return (
            <div className="addToCart">
                <NumberInput
                    label=""
                    name="quantity"
                    value={this.state.quantity}
                    valueChange={this.setValue}
                    inputProps={{
                        size: 2,
                        min: 0,
                        max: 99,
                    }}
                />
                <button onClick={this.addToCart}>
                    Add to Cart
                </button>
                {
                    existing &&
                    <div className="cart-note">{existing.Quantity} in cart (<a role="button" onClick={this.removeItem(existing)}>remove</a>)</div>
                }
            </div>
        );
    }
}