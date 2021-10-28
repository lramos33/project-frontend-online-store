import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartComponent from '../components/CartComponent';

export class ShoppingCart extends Component {
  componentDidMount() {
    const { readSavedCart } = this.props;
    readSavedCart();
  }

  render() {
    const { shopCart } = this.props;
    if (!shopCart.length) {
      return <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>;
    }
    return (
      shopCart.map((cartItem, index) => (
        <CartComponent key={ index } cartItem={ cartItem } />
      ))
    );
  }
}

ShoppingCart.propTypes = {
  readSavedCart: PropTypes.func.isRequired,
  shopCart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShoppingCart;
