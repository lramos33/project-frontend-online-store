import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './PorductCard';

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      products: [],
    };
  }

  fetchProductAPI = async () => {
    const category = '';
    const { searchInput } = this.state;
    const fetchedProducts = await getProductsFromCategoryAndQuery(category, searchInput);
    if (fetchedProducts) {
      this.setState({ products: fetchedProducts.results });
    }
  }

  handleChange = (whichInput) => {
    const { value } = whichInput.target;
    if (value || value === '') {
      this.setState({ searchInput: value });
    }
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <header>
          <input
            data-testid="query-input"
            type="text"
            name="sometext"
            onChange={ this.handleChange }
          />
          <button
            data-testid="query-button"
            type="submit"
            onClick={ this.fetchProductAPI }
          >
            Procurar
          </button>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
          <Link data-testid="shopping-cart-button" to="/shopping-cart">Carrinho</Link>
        </header>
        <section>
          {products.map((whichProduct) => (
            <ProductCard key={ whichProduct.id } { ...whichProduct } whichProduct={ whichProduct } />
          ))}
        </section>
      </div>
    );
  }
}
export default ProductList;
