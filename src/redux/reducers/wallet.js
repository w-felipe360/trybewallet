const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  // editor: false, // valor booleano que indica de uma despesa está sendo editada
  // idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCIES-DATA':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'DESPESAS-DATA':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'LIMPA-DATA':
    return {
      ...state,
      expenses: state.expenses.filter((elemento) => (
        Number(action.payload) !== Number(elemento.id))),
    };
  default:
    return state;
  }
};
export default wallet;
