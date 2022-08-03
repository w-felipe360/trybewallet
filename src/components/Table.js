import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { limparInfos } from '../redux/actions';

class Table extends Component {
  clicaBotao = (event) => {
    const { id } = event.target;
    const { apaga } = this.props;
    apaga(id);
  }

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
                <td>{Number(valor.exchangeRates[valor.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(valor.value)
                  * Number(valor.exchangeRates[valor.currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="submit"
                    key={ valor.id }
                    id={ valor.id }
                    onClick={ this.clicaBotao }
                  >
                    Excluir

                  </button>
                </td>
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

const mapDispatchToProps = (dispatch) => ({
  apaga: (elementos) => dispatch(limparInfos(elementos)),
});

Table.propTypes = {
  valores: PropTypes.array,
  apaga: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
