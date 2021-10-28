import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import { ShoppingCart } from './pages/ShoppingCart';
import { getProductsFromCategoryAndQuery } from './services/api';
import './App.css';
import Checkout from './pages/Checkout';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentCategory: '',
      shopCart: [],
      searchInput: '',
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    const { currentCategory, searchInput } = this.state;
    if (currentCategory !== prevState.currentCategory) {
      this.fetchProductAPI(currentCategory, searchInput);
    }
  }

  handleChange = (whichInput) => {
    const { value } = whichInput.target;
    if (value || value === '') {
      this.setState({ searchInput: value });
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
    const { products, shopCart, currentCategory, searchInput } = this.state;
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
                handleChanger={ this.handleChange }
                searchProduct={ searchInput }
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
                currentCategory={ currentCategory }
                addProduct={ this.addProduct }
              />) }
          />
          <Route
            exact
            path="/checkout"
            render={ (props) => (<Checkout
              { ...props }
              shopCart={ shopCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
