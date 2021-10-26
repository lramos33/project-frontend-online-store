import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  handleChange = (whichInput) => {
    const { value } = whichInput.target;
    if (value || value === '') {
      this.setState({ searchInput: value });
    }
  }

  render() {
    const { products, fetcher } = this.props;
    const { searchInput } = this.state;
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
            onClick={ () => fetcher('', searchInput) }
          >
            Procurar
          </button>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
          <Link data-testid="shopping-cart-button" to="/shopping-cart">Carrinho</Link>
        </header>
        <main>
          <Categories />
          <section className="cardBox">
            {products.map((whichProduct) => (
              <ProductCard
                key={ whichProduct.id }
                { ...whichProduct }
                whichProduct={ whichProduct }
              />
            ))}
          </section>
        </main>
      </div>
    );
  }
}

ProductList.propTypes = {
  fetcher: PropTypes.func.isRequired,
  products: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
export default ProductList;
