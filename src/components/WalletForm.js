import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { currenciesThunk, despesas, alimenta } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimenta,
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { recebeMoeda } = this.props;
    recebeMoeda();
  }

  solicitaApi = async () => {
    const minhaApi = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(minhaApi);
    const meuJson = await response.json();
    return meuJson;
  }

  escreve = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  enviaDados = async () => {
    const { enviaDespesas } = this.props;
    this.setState({
      exchangeRates: await this.solicitaApi(),
    });
    enviaDespesas(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimenta,
      exchangeRates: [],
    }));
  }

  render() {
    const { value, description } = this.state;
    const { moeda } = this.props;
    return (
      <div>
        <input
          value={ value }
          type="number"
          data-testid="value-input"
          name="value"
          onChange={ this.escreve }
        />
        <input
          value={ description }
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ this.escreve }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.escreve }

        >
          {
            moeda.map((currencie) => (
              <option key={ currencie }>{ currencie }</option>
            ))
          }
        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.escreve }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.escreve }
        >
          <option>{alimenta}</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="submit"
          onClick={ this.enviaDados }
        >
          {' '}
          Adicionar despesas

        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies });

const mapDispatchToProps = (dispatch) => ({
  recebeMoeda: () => dispatch(currenciesThunk()),
  enviaDespesas: (dados) => dispatch(despesas(dados)),
});
WalletForm.propTypes = {
  recebeMoeda: PropTypes.func,
  moeda: PropTypes.array,
  enviaDespesas: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
