import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { valores } = this.props;
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
        <tbody>
          {
            valores.map((valor, index) => (
              <tr key={ index }>
                <td>{valor.description}</td>
                <td>{valor.tag}</td>
                <td>{valor.method}</td>
                <td>{Number(valor.value).toFixed(2)}</td>
                <td>{valor.exchangeRates[valor.currency].name}</td>
                <td>{valor.exchangeRates[valor.currency].codein}</td>
                <td>{Number(valor.exchangeRates[valor.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(valor.value)
                  * Number(valor.exchangeRates[valor.currency].ask)).toFixed(2)}
                </td>
                <td>{valor.currency}</td>
                <td>Real</td>
              </tr>

            ))
          }
        </tbody>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  valores: state.wallet.expenses });

Table.propTypes = {
  valores: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(Table);
