import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class PorductCard extends Component {
  render() {
    const { whichProduct } = this.props;
    return (
      <div data-testid="product">
        <p>{whichProduct.title}</p>
        <img src={ whichProduct.thumbnail } alt="Imagem do Produto" />
        <p>{whichProduct.price}</p>
      </div>
    );
  }
}

PorductCard.propTypes = {
  whichProduct: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default PorductCard;
