import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';
import { createMemoryHistory } from 'history';
import Wallet from '../pages/Wallet';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
const history = createMemoryHistory();
// const email = screen.getByPlaceholderText('E-Mail');
// const senha = screen.getByPlaceholderText('Password');
describe('Testando a aplicação:' , () => {
  test('se a página renderiza o campo de e-mail', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByPlaceholderText('E-Mail')
    expect(email).toBeInTheDocument();
    })
    test('se é renderizado o campo para digitar a senha', () => {
      renderWithRouterAndRedux(<Login />);
      const senha = screen.getByPlaceholderText('Password');
      expect(senha).toBeInTheDocument();
    })
    test('se é renderizado um botão de login', () => {
      renderWithRouterAndRedux(<Login />);
      const loginButton = screen.getByRole('button', {
        name: /entrar/i
      })
      expect(loginButton).toBeInTheDocument();
    })
    test(`se a página de carteira é renderizada corretamente`, () => {
   renderWithRouterAndRedux(<Wallet />);
   console.log(screen.logTestingPlaygroundURL());
      const loggedUser = screen.getByRole('heading', {
        name: /brl/i
      });
      expect(loggedUser).toBeInTheDocument();
    })
    test(`se o botão tá funcionando`, () => {
   renderWithRouterAndRedux(<Login />);
   const emailInput = screen.getByPlaceholderText(/e-mail/i);
   const passInput = screen.getByPlaceholderText(/password/i);
   const botaoChato = screen.getByRole('button', {
    name: /entrar/i
  })
  userEvent.type(emailInput, 'w.felipe@gmail.com');
  userEvent.type(passInput, '123456789');
  userEvent.click(botaoChato);

  renderWithRouterAndRedux(<Wallet />);
  const description = screen.getByTestId('description-input');
   expect(description).toBeInTheDocument();

    })
  test(`se existe um campo para inserir o dinheiro`, () => {
   renderWithRouterAndRedux(<Wallet />);
    const dinheiro = screen.getByTestId('value-input');
    expect(dinheiro).toBeInTheDocument();
  })
  test(`teste se há um campo para a descrição`, () => {
   renderWithRouterAndRedux(<Wallet />);
   const description = screen.getByTestId('description-input');
   expect(description).toBeInTheDocument();
  })
  test(`teste se existe um botão com o texto adicionar despesas`, () => {
   renderWithRouterAndRedux(<Wallet />);
    
    const botaoChato = screen.getByRole('button', {
      name: /adicionar despesas/i
    })
    expect(botaoChato).toBeInTheDocument();
  })
  test(`se há um campo para inserir pagamentos`, () => {
   renderWithRouterAndRedux(<Wallet />);
    const money = screen.getByText('Dinheiro');
    expect(money).toBeInTheDocument();
  })
})