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
  onClickCategory = ({target}) => {
    const { id } = target;
    this.setState({
      currentCategory: id,
    });
  }

  render() {
    const { products, currentCategory } = this.state;
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
              />
            ) }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ (props) => <ShoppingCart { ...props } /> }
          />
          <Route
            exact
            path="/product/:id"
            render={ () => <ProductDetail fetcher={ this.fetchProductAPI } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
