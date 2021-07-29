export const getSessionStorage = () => {
  const retrieveSession = JSON.parse(sessionStorage.getItem('cnpj-search'));
  const isSessionValid = retrieveSession? retrieveSession : [];
  return isSessionValid;
}

export const setSessionStorage = (cnpj) => {
  const session = getSessionStorage();
  if(!session.includes(cnpj)) {
    const array = [...session, cnpj];
    sessionStorage.setItem('cnpj-search', JSON.stringify(array));
  }
};
