import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import AddCart from '../components/AddCart';
import { Review } from '../components/Review';

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
    const { productObject } = this.state;
    const { currency_id: currencyId, price, thumbnail, title } = productObject;
    const { addProduct } = this.props;
    return (
      <div>
        <h2 data-testid="product-detail-name">
          { title }
        </h2>
        <h3>
          {`${currencyId} ${price}`}
        </h3>
        <img src={ thumbnail } alt={ title } />
        <AddCart
          testID="product-detail-add-to-cart"
          whichProduct={ productObject }
          addProduct={ addProduct }
        />
        <Link data-testid="shopping-cart-button" to="/shopping-cart">Carrinho</Link>
        <Review />
      </div>
    );
  }
}
ProductDetail.propTypes = {
  addProduct: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
export default ProductDetail;
