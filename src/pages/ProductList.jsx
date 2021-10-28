import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';

class ProductList extends Component {
  componentDidMount() {
    const { readSavedCart } = this.props;
    readSavedCart();
  }

  render() {
    const {
      products,
      fetcher,
      categoryClick,
      currentCategory,
      addProduct,
      handleChanger,
      searchProduct,
      shopCart,
    } = this.props;
    return (
      <div>
        <header>
          <input
            data-testid="query-input"
            type="text"
            name="sometext"
            onChange={ (target) => handleChanger(target) }
          />
          <button
            data-testid="query-button"
            type="submit"
            onClick={ () => fetcher(currentCategory, searchProduct) }
          >
            Procurar
          </button>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
          <Link data-testid="shopping-cart-button" to="/shopping-cart">Carrinho</Link>
          <p data-testid="shopping-cart-size">{shopCart.length}</p>
        </header>
        <main>
          <Categories clickFunc={ categoryClick } />
          <section className="cardBox">
            {products.map((whichProduct) => (
              <ProductCard
                key={ whichProduct.id }
                whichProduct={ whichProduct }
                addProduct={ addProduct }
              />
            ))}
          </section>
        </main>
      </div>
    );
  }
}

ProductList.propTypes = {
  readSavedCart: PropTypes.func.isRequired,
  shopCart: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  fetcher: PropTypes.func.isRequired,
  categoryClick: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  handleChanger: PropTypes.func.isRequired,
  products: PropTypes
    .arrayOf(PropTypes.object).isRequired,
  currentCategory: PropTypes.string,
  searchProduct: PropTypes.string.isRequired,
};

ProductList.defaultProps = {
  currentCategory: '',
};

export default ProductList;
