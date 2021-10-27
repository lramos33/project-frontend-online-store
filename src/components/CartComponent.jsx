import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 1,
    };
  }

  changeQty = (sum) => {
    const { itemCount } = this.state;
    if (sum) {
      this.setState({ itemCount: itemCount + 1 });
    } else {
      this.setState({ itemCount: itemCount - 1 });
    }
  }

  render() {
    const { cartItem } = this.props;
    const { itemCount } = this.state;
    return (
      <div>
        <button type="button">Remover</button>
        <img width="150px" src={ cartItem.thumbnail } alt="Imagem do Produto" />
        <p data-testid="shopping-cart-product-name">{ cartItem.title }</p>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ () => this.changeQty(true) }
        >
          +
        </button>
        <span data-testid="shopping-cart-product-quantity">{itemCount}</span>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ () => this.changeQty(false) }
        >
          -
        </button>
        <p>{ (cartItem.price * itemCount).toFixed(2) }</p>
      </div>
    );
  }
}

CartComponent.propTypes = {
  cartItem: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default CartComponent;
