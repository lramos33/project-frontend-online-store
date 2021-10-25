import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  fetchProductAPI = async () => {
    const category = 'MLB271599';
    const { searchInput } = this.state;
    const fetchedProducts = await getProductsFromCategoryAndQuery(category, searchInput);
    console.log(fetchedProducts);
  }

  handleChange = (whichInput) => {
    const { value } = whichInput.target;
    if (value || value === '') {
      this.setState({ searchInput: value });
    }
  }

  render() {
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
          <span>Conteudo</span>
        </section>
      </div>
    );
  }
}
export default ProductList;
