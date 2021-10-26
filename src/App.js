import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import { ShoppingCart } from './pages/ShoppingCart';
import { getProductsFromCategoryAndQuery } from './services/api';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentCategory: '',
      shopCart: [],
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    const { currentCategory } = this.state;
    if (currentCategory !== prevState.currentCategory) {
      this.fetchProductAPI(currentCategory, '');
    }
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

  // Requisito 06
  onClickCategory = ({ target }) => {
    const { id } = target;
    this.setState({
      currentCategory: id,
    });
  }

  addProduct = async (product) => {
    const { shopCart } = this.state;
    this.setState({ shopCart: [...shopCart, product] });
  }

  render() {
    const { products, shopCart, currentCategory } = this.state;
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
                categoryClick={ this.onClickCategory }
                currentCategory={ currentCategory }
                addProduct={ this.addProduct }
              />
            ) }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ (props) => <ShoppingCart { ...props } shopCart={ shopCart } /> }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (
              <ProductDetail
                { ...props }
                fetcher={ this.fetchProductAPI }
                currentCategory={ currentCategory }
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
