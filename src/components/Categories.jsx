import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCategories: [],
      currentCategory: '',
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

  // Requisito 06
  onClickCategory = ({target}) => {
    const { id } = target;
    this.setState({ 
      currentCategory: id
    });
  }

  render() {
    const { allCategories } = this.state;

    return (
      <div>
        {allCategories.map((element) => (
          <ul key={ element.id }>
            <label htmlFor={ element.name } >
              { element.name }
              <input
                type="radio"
                id={ element.id }
                name="category"
                data-testid="category"
                onChange= { this.onClickCategory }
              />
            </label>
          </ul>
        ))}
      </div>
    );
  }
}

export default Categories;
