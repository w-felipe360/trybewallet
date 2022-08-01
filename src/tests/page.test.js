import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';
import { createMemoryHistory } from 'history';
import renderWithRouter from './RenderWithRouter';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
const history = createMemoryHistory();
      const store = createStore(rootReducer);
      // const email = screen.getByPlaceholderText('E-Mail');
      // const senha = screen.getByPlaceholderText('Password');
describe('Testando a aplicação:' , () => {
    test('se a página renderiza o campo de e-mail', () => {
      const store = createStore(rootReducer);
    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>, ['/']
    )
    const email = screen.getByPlaceholderText('E-Mail');

    expect(email).toBeInTheDocument();
    })
    test('se é renderizado o campo para digitar a senha', () => {
      renderWithRouter(
        <Provider store={ store }>
          <App />
        </Provider>, ['/']
      )
      const senha = screen.getByPlaceholderText('Password');
      expect(senha).toBeInTheDocument();
    })
    test('se é renderizado um botão de login', () => {
      renderWithRouter(
        <Provider store={ store }>
          <App />
        </Provider>, ['/']
      )
      const loginButton = screen.getByRole('button', {
        name: /entrar/i
      })
      expect(loginButton).toBeInTheDocument();
    })
    test(`se ao preencher o login e clicar no botão, a página
    da carteira é renderizada`, async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/')
      const loginButton = screen.getByRole('button', {
        name: /entrar/i
      })
      const email = screen.getByPlaceholderText('E-Mail');
      const senha = screen.getByPlaceholderText('Password');
      userEvent.type(email, 'teste.teste@gmail.com');
      userEvent.type(senha, '123456789');
      userEvent.click(loginButton);
      const loggedUser = screen.getByRole('heading', {
        name: /teste\.teste@gmail\.com/i
      })
      expect(loggedUser).toBeInTheDocument();
    })
})