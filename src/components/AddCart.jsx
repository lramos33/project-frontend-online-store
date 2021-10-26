import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddCart extends Component {
  render() {
    const { addProduct, whichProduct } = this.props;
    return (
      <div data-testid="product-add-to-cart">
        <button
          type="button"
          onClick={ () => addProduct(whichProduct) }
        >
          Add
        </button>
      </div>
    );
  }
}

AddCart.propTypes = {
  addProduct: PropTypes.func.isRequired,
  whichProduct: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default AddCart;
