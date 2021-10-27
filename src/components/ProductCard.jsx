import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddCart from './AddCart';

class ProductCard extends Component {
  render() {
    const { whichProduct, addProduct } = this.props;
    return (
      <div className="productCardWrapper">
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
        <AddCart
          testID="product-add-to-cart"
          whichProduct={ whichProduct }
          addProduct={ addProduct }
        />
      </div>
    );
  }
}
ProductCard.propTypes = {
  addProduct: PropTypes.func.isRequired,
  whichProduct: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
export default ProductCard;
