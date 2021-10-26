import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { whichProduct } = this.props;
    return (
      <Link
        data-testid="product-detail-link"
        to={ {
          pathname: `/product/${whichProduct.id}`,
          state: { ...whichProduct },
        } }
      >
        <div data-testid="product">
          <p>{whichProduct.title}</p>
          <img src={ whichProduct.thumbnail } alt="Imagem do Produto" />
          <p>{whichProduct.price}</p>
        </div>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  whichProduct: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
