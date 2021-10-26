import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ShoppingCart extends Component {
  render() {
    const { shopCart } = this.props;
    if (!shopCart.length) {
      return <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>;
    }
    return (
      shopCart.map((cartItem, index) => (
        <div key={ index }>
          <p>{cartItem.title}</p>
          <img width="150px" src={ cartItem.thumbnail } alt="Imagem do Produto" />
          <p>{cartItem.price}</p>
        </div>
      ))
    );
  }
}
//
ShoppingCart.propTypes = {
  shopCart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShoppingCart;
