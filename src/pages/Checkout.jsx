import React from 'react';

export default class Checkout extends React.Component {
  render() {
    return (
      <section>
        <input data-testid="checkout-fullname" placeholder="Nome completo" />
        <input data-testid="checkout-email" placeholder="Email" />
        <input data-testid="checkout-cpf" placeholder="CPF" />
        <input data-testid="checkout-phone" placeholder="Telefone" />
        <input data-testid="checkout-cep" placeholder="CEP" />
        <input data-testid="checkout-address" placeholder="Endereço" />
      </section>
    );
  }
}
