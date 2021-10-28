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

  componentDidMount() {
    this.getLocalStorage();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { currentCategory, searchInput, shopCart } = this.state;
    if (currentCategory !== prevState.currentCategory) {
      this.fetchProductAPI(currentCategory, searchInput);
    }
    if (shopCart !== prevState.shopCart) {
      this.saveShopCart(shopCart);
    }
  }

  addProduct = (product) => {
    const { shopCart } = this.state;
    this.setState({
      shopCart: [...shopCart, product],
    });
  }

  getLocalStorage = () => {
    const retrievedCart = this.readSavedCart();
    if (retrievedCart && retrievedCart.length) {
      this.setState({
        shopCart: retrievedCart,
      });
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

  onClickCategory = ({ target }) => {
    const { id } = target;
    this.setState({
      currentCategory: id,
    });
  }

  saveShopCart = (shopCart) => localStorage
    .setItem('saved_cart', JSON.stringify(shopCart));

  readSavedCart = () => JSON.parse(localStorage.getItem('saved_cart'));

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
                readSavedCart={ this.readSavedCart }
                shopCart={ shopCart }
              />
            ) }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ (props) => (<ShoppingCart
              { ...props }
              shopCart={ shopCart }
              readSavedCart={ this.readSavedCart }
            />) }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (
              <ProductDetail
                { ...props }
                currentCategory={ currentCategory }
                addProduct={ this.addProduct }
                readSavedCart={ this.readSavedCart }
                shopCart={ shopCart }
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
