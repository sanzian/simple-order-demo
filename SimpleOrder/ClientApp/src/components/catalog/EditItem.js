import React, { Component } from 'react';
import { TextInput } from '../controls/TextInput';
import { TextAreaInput } from '../controls/TextAreaInput';
import { CheckBoxInput } from '../controls/CheckBoxInput';
import { AddItemOption } from './AddItemOption';

export class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            options: [],
        };
        this.saveUrl = `api/items`;
        this.saveMethod = 'POST';
        if (props.match &&
            props.match.params &&
            props.match.params.id) {
            let id = props.match.params.id;
            this.saveUrl += `/${id}`;
            this.saveMethod = 'PUT';
            fetch(this.saveUrl)
                .then(response => response.json())
                .then(data => {
                    data.loading = false;
                    this.setState(data,
                        () => {
                        });
                });
        }
        else {
            this.state.loading = false;
        }
    }

    setValue = (event) => {
        this.setState(event);
    }

    handleAddItemOptionChange = (event) => {
        let arr = this.state.options.slice();
        let i = this.getItemIndex(arr, event);
        arr.splice(i, 1, event);
        this.setState({ options: arr });
    }

    getItemIndex = (arr, item) => {
        let q = arr.find(x => x.key === item.key);
        let i = arr.indexOf(q);
        return i;
    }

    addItem = () => {
        let arr = this.state.options.slice();
        arr.push({ sortOrder: arr.length - 1 });
        this.setState({ options: arr });
    }

    deleteItem = (key) => {
        return (event) => {
            let arr = this.state.options.slice();
            arr = arr.filter(x => x.key !== key);
            this.setState({ options: arr });
        }
    }

    save = () => {
        this.setState({ loading: true });
        let headers = {
            method: this.saveMethod,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        };
        fetch(this.saveUrl, headers)
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                document.location.href = '/catalog';
            });
    }

    render() {
        if (this.state.loading) {
            return (<div>Loading ...</div>);
        }
        return (
            <div>
                <TextInput
                    label="Item Number"
                    value={this.state.itemNumber}
                    valueChange={this.setValue}
                    disabled={this.state.loading}
                />
                <TextInput
                    label="Name"
                    value={this.state.name}
                    valueChange={this.setValue}
                    disabled={this.state.loading}
                />
                <TextAreaInput
                    label="Description"
                    value={this.state.description}
                    valueChange={this.setValue}
                    disabled={this.state.loading}
                />
                <TextInput
                    label="Image"
                    value={this.state.image}
                    valueChange={this.setValue}
                    disabled={this.state.loading}
                />
                <CheckBoxInput
                    label="Taxable"
                    value={this.state.taxable}
                    valueChange={this.setValue}
                    disabled={this.state.loading}
                />
                <button
                    role="button"
                    onClick={this.addItem}
                    disabled={this.state.loading}>
                    Add Option
                </button>
                {this.state.options.map((v, i) => {
                    if (v.key == undefined) {
                        v.key = btoa(Date.now() + i);
                    }
                    return (
                        <div key={v.key}>
                            <AddItemOption
                                value={v}
                                onChange={this.handleAddItemOptionChange}
                                disabled={this.state.loading}
                            />
                            <button
                                role="button"
                                onClick={this.deleteItem(v.key)}
                                disabled={this.state.loading}>
                                Delete Option
                            </button>
                        </div>
                    );
                })}
                <div>
                    <button
                        disabled={this.state.loading}
                        onClick={this.save}>
                        Save Item
                    </button>
                </div>
            </div>
        );
    }
}
