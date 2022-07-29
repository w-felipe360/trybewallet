import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { currenciesThunk, despesas } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      numberInput: 0,
      productInput: '',
      currencyInput: '',
      paymentMethod: '',
      category: '',
      id: 0,
      dadosMoedas: [],
    };
  }

  componentDidMount() {
    const { recebeMoeda } = this.props;
    recebeMoeda();
  }

  escreve = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  enviaDados = () => {
    const { enviaDespesas, moeda } = this.props;
    enviaDespesas(this.state);
    this.setState({
      numberInput: 0,
      productInput: '',
      currencyInput: '',
      paymentMethod: '',
      category: '',
      id: 0,
      dadosMoedas: [moeda],

    });
  }

  render() {
    const { numberInput, productInput } = this.state;
    const { moeda } = this.props;
    return (
      <div>
        <input
          value={ numberInput }
          type="number"
          data-testid="value-input"
          name="numberInput"
          onChange={ this.escreve }
        />
        <input
          value={ productInput }
          type="text"
          data-testid="description-input"
          name="productInput"
          onChange={ this.escreve }
        />
        <select
          data-testid="currency-input"
          name="currencyInput"
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
          name="paymentMethod"
          onChange={ this.escreve }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="category"
          onChange={ this.escreve }
        >
          <option>Alimentação</option>
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
