import React, { Component } from 'react';

export class Review extends Component {
  render() {
    return (
      <div>
        <h4>Avaliações</h4>
        <input type="email" name="email" />
        <div>
          <textarea
            data-testid="product-detail-evaluation"
            name="mensagem"
            id="mensagem"
            cols="50"
            rows="10"
          />
        </div>
        <button type="button">Avaliar</button>
      </div>
    );
  }
}

export default Review;
