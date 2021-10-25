import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class ProductList extends Component {
  render() {
    return (
      <div>
        <input type="text" name="sometext" />
        <Link data-testid="shopping-cart-button" to="/shopping-cart">Carrinho</Link>
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </div>
    );
  }
}
export default ProductList;