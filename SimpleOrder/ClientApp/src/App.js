import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Catalog } from './components/catalog/Catalog';
import { EditItem } from './components/catalog/EditItem';
import { CartComponent } from './components/cart/CartComponent';
import { AdminComponent } from './components/admin/AdminComponent';
import { Home } from './components/Home';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            cart: {},
            manageMode: false,
        };
    }

    stateChange = (event) => {
        this.setState(event,
            () => {
            });
    }

/* *
                <Route exact path='/' component={Home} />
/* */

    render() {
        return (
            <Layout>
                <Route exact path='/' render={() => <Redirect to='/catalog' />} />
                <Route exact path='/admin' component={() => <AdminComponent state={this.state} stateChange={this.stateChange} />} />
                <Route exact path='/catalog' component={() => <Catalog state={this.state} />} />
                <Route exact path='/catalog/add' component={EditItem} />
                <Route exact path='/catalog/edit/:id' component={EditItem} />
                <Route exact path='/cart' component={() => <CartComponent state={this.state} />} onChange={(event) => this.setState(event)} />
            </Layout>
        );
    }
}
