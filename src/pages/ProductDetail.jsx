import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productObject: {},
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const {
      location: {
        state: {
          category_id: categoryId,
          title,
        },
      },
    } = this.props;
    const thatProduct = await getProductsFromCategoryAndQuery(categoryId, title);
    if (thatProduct) {
      this.setState({
        productObject: thatProduct.results[0],
      });
    }
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

export default ProductDetail;
