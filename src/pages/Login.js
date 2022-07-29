import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recebeEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputLogin: '',
      senha: '',
      button: true,
    };
  }

  escreve = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => this.ativaBotao());
  }

  ativaBotao = () => {
    const { senha, inputLogin } = this.state;
    const numeroSeis = 6;
    if (senha.length >= numeroSeis && inputLogin.includes('@' && '.com')) {
      return this.setState({ button: false });
    }
    recebeEmail(inputLogin);
    return this.setState({ button: true });
  }

  trocaPagina = () => {
    const { history, pegaEmail } = this.props;
    const { inputLogin } = this.state;
    pegaEmail(inputLogin);
    history.push('/carteira');
  }

  render() {
    const { button, senha, inputLogin } = this.state;
    return (
      <div>
        <form>
          <input
            name="inputLogin"
            type="email"
            data-testid="email-input"
            placeholder="E-Mail"
            value={ inputLogin }
            onChange={ this.escreve }
          />
          <input
            name="senha"
            type="password"
            data-testid="password-input"
            placeholder="Password"
            value={ senha }
            onChange={ this.escreve }
          />
          <button
            disabled={ button }
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.trocaPagina }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  pegaEmail: (email) => dispatch(recebeEmail(email)),
});
Login.propTypes = {
  history: PropTypes.func.isRequired,
  pegaEmail: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
