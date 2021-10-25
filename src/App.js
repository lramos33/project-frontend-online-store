import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import { ProductList } from './services/ProductList';
// import { ShoppingCart } from './__tests__/pages/ShoppingCart';
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
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;