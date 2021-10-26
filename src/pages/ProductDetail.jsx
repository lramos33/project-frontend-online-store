import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    const { location: { state: productInfo } } = this.props;
    this.state = {
      productObject: productInfo,
    };
  }

  render() {
    const {
      productObject: { currency_id: currencyId, price, thumbnail, title } } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">
          { title }
        </h2>
        <h3>
          {`${currencyId} ${price}`}
        </h3>
        <img src={ thumbnail } alt={ title } />
      </div>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
