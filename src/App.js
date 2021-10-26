import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { ProductList } from './pages/ProductList';
import { ShoppingCart } from './pages/ShoppingCart';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ ProductList } />
          <Route
            exact
            path="/shopping-cart"
            render={ (props) => <ShoppingCart { ...props } /> }
          />
          <Route exact path="/product/:id" component={ ProductDetail } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
