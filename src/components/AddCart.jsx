import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddCart extends Component {
  render() {
    const { addProduct, whichProduct, testID } = this.props;
    return (
      <button
        data-testid={ testID }
        type="button"
        onClick={ () => addProduct(whichProduct) }
      >
        Add
      </button>
    );
  }
}
AddCart.propTypes = {
  testID: PropTypes.string.isRequired,
  addProduct: PropTypes.func.isRequired,
  whichProduct: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
export default AddCart;
