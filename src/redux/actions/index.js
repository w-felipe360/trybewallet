// Coloque aqui suas actions
export const recebeEmail = (email) => ({
  type: 'EMAIL-DATA',
  payload: email,
});
export const alimenta = 'Alimentação';
export const recebeMoeda = (moeda) => ({
  type: 'CURRENCIES-DATA',
  payload: moeda,
});
export const currenciesThunk = () => async (dispatch) => {
  const minhaApi = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(minhaApi);
  const meuJson = await response.json();
  const resultado = Object.keys(meuJson).filter((key) => key !== 'USDT');
  dispatch(recebeMoeda(resultado));
};
export const despesas = (elementos) => ({
  type: 'DESPESAS-DATA',
  payload: elementos,
});
