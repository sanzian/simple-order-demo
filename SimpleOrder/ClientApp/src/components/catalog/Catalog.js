import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AddToCart } from '../cart/AddToCart';
import { browserNotSupported } from '../controls/Shared';

export class Catalog extends Component {
    static displayName = Catalog.name;

    constructor(props) {
        super(props);
        this.state = props.state || {};

        fetch('api/items')
            .then(response => response.json())
            .then(data => {
                this.state.items = data;
                this.state.loading = false;
                this.setState(this.state);
            });
    }

    deleteItem = (id) => {
        return () => {
            let url = `api/items/${id}`;
            this.setState({ loading: true });
            let headers = {
                method: 'DELETE',
            };
            fetch(url, headers)
                .then(response => response.json())
                .then(data => {
                    this.setState({ loading: false });
                    document.location.href = '/catalog';
                });
        }
    }

    render() {
        browserNotSupported();
        let contents = this.state.loading
            ? <p><em>Loading ...</em></p>
            : this.renderItems(this.state.items || []);

        return (
            <div>{contents}</div>
        );
    }

    renderItems(data) {
        if (this.state.manageMode) {
            return (
                <div className="catalog-manage">
                    {this.state.manageMode && <a href="/catalog/add">Add Item</a>}
                    <table>
                        <tbody>
                            {data.map(record =>
                                <tr key={record.id}>
                                    <td>
                                        <a className="deleteButton" role="button" onClick={this.deleteItem(record.id)}>Delete</a>
                                        <span> | </span>
                                        <a href={`/catalog/edit/${record.id}`}>Edit</a>
                                    </td>
                                    <td>
                                        <div className="itemName">{record.name}</div>
                                        {(record.image || "").trim() !== "" &&
                                            <div className="itemImage">{record.image}</div>
                                        }
                                        {(record.description || "").trim() !== "" &&
                                            <div className="itemDescription">{record.description}</div>
                                        }
                                        {record.options.map((option, i) => {
                                            option.key = btoa(Date.now + i);
                                            return (
                                                <div className="itemOption" key={option.key}>
                                                    <div className="itemOptionItemNumber">{((record.itemNumber || "") + (option.itemNumber || "")).trim()}</div>
                                                    <div className="itemOptionName" key={option.name}>{option.name}</div>
                                                    <div className="itemOptionPrice">${option.price}</div>
                                                </div>
                                            );
                                        })}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div className="catalog">
                    <div className="size-options">
                        <img src="images/size-options.png" />
                    </div>
                    {data.map(record =>
                        <div key={record.id}>
                            <div className="itemName">{record.name}</div>
                            {(record.image || "").trim() !== "" &&
                                <div className="itemImage"><img src={record.image} /></div>
                            }
                            {(record.description || "").trim() !== "" &&
                                <div className="itemDescription">{record.description}</div>
                            }
                            {record.options.map((option, i) => {
                                option.key = btoa(Date.now + i);
                                return (
                                    <div className="itemOption" key={option.key}>
                                        <div className="itemOptionItemNumber">
                                            {((record.itemNumber || "") + (option.itemNumber || "")).trim()}
                                        </div>
                                        <div className="itemOptionName" key={option.name}>
                                            {option.name}
                                        </div>
                                        <div className="itemOptionPrice">
                                            $ {option.price}
                                        </div>
                                        <div className="itemOptionAddToCart">
                                            <AddToCart
                                                state={{ cart: this.state.cart, item: record, option: option }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    )}
                </div>
            );
        }
    }
}

export default withRouter(Catalog)
