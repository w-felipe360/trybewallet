import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  pegaValor = () => {
    const { valorMoeda } = this.props;
    const moeda = valorMoeda.reduce((acc, rates) => (acc + rates.value
    * rates.exchangeRates[rates.currency].ask),
    0);
    return moeda.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">
          {email}
        </h3>
        <h3 data-testid="total-field">{this.pegaValor()}</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({

  email: state.user.email,
  valorMoeda: state.wallet.expenses,
});
Header.propTypes = {
  email: PropTypes.string.isRequired,
  valorMoeda: PropTypes.number.isRequired,
};
export default connect(mapStateToProps, null)(Header);
