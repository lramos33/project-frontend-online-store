import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 1,
      disableButtonAdd: 'ativo',
      disableButtonRemove: 'ativo',
    };
  }

  componentDidMount() {
    this.checkQuantity();
  }

  checkQuantity = () => {
    const { cartItem } = this.props;
    const { itemCount } = this.state;
    const minItens = 0;

    if (cartItem.available_quantity === itemCount) {
      this.setState({ disableButtonAdd: '' });
    } else {
      this.setState({ disableButtonAdd: 'ativo' });
    }

    if (itemCount === minItens) {
      this.setState({ disableButtonRemove: '' });
    } else {
      this.setState({ disableButtonRemove: 'ativo' });
    }
  }

  changeQty = (sum) => {
    const { itemCount } = this.state;

    if (sum) {
      this.setState({ itemCount: itemCount + 1 }, () => this.checkQuantity());
    } else {
      this.setState({ itemCount: itemCount - 1 }, () => this.checkQuantity());
    }
  }

  render() {
    const { cartItem } = this.props;
    const { itemCount, disableButtonAdd, disableButtonRemove } = this.state;
    return (
      <div>
        <button type="button">Remover</button>
        <img width="150px" src={ cartItem.thumbnail } alt="Imagem do Produto" />
        <p data-testid="shopping-cart-product-name">{ cartItem.title }</p>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ () => this.changeQty(true) }
          disabled={ !disableButtonAdd }
        >
          +
        </button>
        <span data-testid="shopping-cart-product-quantity">{itemCount}</span>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ () => this.changeQty(false) }
          disabled={ !disableButtonRemove }
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
    available_quantity: PropTypes.number,
  }).isRequired,
};

export default CartComponent;
