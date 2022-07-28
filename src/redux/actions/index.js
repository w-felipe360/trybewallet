// Coloque aqui suas actions
function recebeEmail(email) {
  return {
    type: 'EMAIL-DATA',
    payload: email,
  };
}
export default recebeEmail;
