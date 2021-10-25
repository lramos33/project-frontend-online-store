import React from 'react';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCategories: [],
    };
  }

  componentDidMount() {
    this.allCategories();
  }

  allCategories = async () => {
    const allCategories = await getCategories();
    this.setState({ allCategories });
  }

  render() {
    const { allCategories } = this.state;

    return(
      <div>
        {allCategories.map((element) => (
          <ul key={ element.id }>
            <label htmlFor={ element.name }> { element.name }
              <input type="radio" id={ element.name } name="category" data-testid="category"></input>
            </label>
          </ul>
        ))}
      </div>
    )
  }
}

export default Categories;