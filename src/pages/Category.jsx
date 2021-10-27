import React from 'react';
import { getCategories } from '../services/api';

export default class Category extends React.Component {
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
    const fetchAllCategories = await getCategories();
    this.setState({ allCategories: [...fetchAllCategories] });
  }

  render() {
    const { allCategories } = this.state;
    return (
      <div>
        {allCategories.map((element) => (
          <p key={ element.name } data-testid="category">{element.name}</p>
        ))}
      </div>
    );
  }
}
