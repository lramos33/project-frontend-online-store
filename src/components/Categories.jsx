import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: [],
    };
  }

  // Requisito 04
  componentDidMount() {
    this.allCategories();
  }

  // Requisito 04
  allCategories = async () => {
    const allCategories = await getCategories();
    this.setState({ allCategories });
  }

  render() {
    const { allCategories } = this.state;
    const { clickFunc } = this.props;
    return (
      <div>
        {allCategories.map((element) => (
          <ul key={ element.id }>
            <label htmlFor={ element.name }>
              { element.name }
              <input
                type="radio"
                id={ element.id }
                name="category"
                data-testid="category"
                onChange={ (target) => clickFunc(target) }
              />
            </label>
          </ul>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  clickFunc: PropTypes.func.isRequired,
};

export default Categories;
