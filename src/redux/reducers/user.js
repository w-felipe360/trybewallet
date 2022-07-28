const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL-DATA':
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
