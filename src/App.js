import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { ProductList } from './pages/ProductList';
import { ShoppingCart } from './pages/ShoppingCart';
import { getProductsFromCategoryAndQuery } from './services/api';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      shopCart: [],
    };
  }

  fetchProductAPI = async (category, product) => {
    const fetchedProducts = await getProductsFromCategoryAndQuery(
      category,
      product,
    );
    if (fetchedProducts) {
      this.setState({ products: fetchedProducts.results });
    }
  };

  addProduct = async (product) => {
    const { shopCart } = this.state;
    this.setState({ shopCart: [...shopCart, product] });
  }

  render() {
    const { products, shopCart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <ProductList
                { ...props }
                fetcher={ this.fetchProductAPI }
                products={ products }
                addProduct={ this.addProduct }
              />
            ) }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ (props) => <ShoppingCart { ...props } shopCart={ shopCart } /> }
          />
          <Route exact path="/product/:id" component={ ProductDetail } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
