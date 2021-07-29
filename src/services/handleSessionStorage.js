export const getSessionStorage = () => {
  // recupera SessionStorage, verifica se está vazio, se estiver retorna um array vazio
  // se o array estiver populado retorna o array recuperado
  const retrieveSession = JSON.parse(sessionStorage.getItem('cnpj-search'));
  const isSessionValid = retrieveSession? retrieveSession : [];
  return isSessionValid;
}

export const setSessionStorage = (cnpj) => {
  // recupera SessionStorage faz o spread dos items recuperados e inclui o cnpj
  const session = getSessionStorage();
  if(!session.includes(cnpj)) {
    const array = [...session, cnpj];
    sessionStorage.setItem('cnpj-search', JSON.stringify(array));
  }
};
