import { setSessionStorage } from "./handleSessionStorage";

const fetchApi = async (cnpj) => {
  // Confiuração do cabeçalho para a requisição api com o token de autorização
  const header = {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "347facd471mshc057415b297ba55p1f1d59jsne3167156a0cf",
      "x-rapidapi-host": "consulta-cnpj-gratis.p.rapidapi.com"
    },
  };
  const apiUrl = `https://consulta-cnpj-gratis.p.rapidapi.com/companies/${cnpj}`;
  return fetch(apiUrl, header)
    .then((response) => response.json())
    .then((result) => {
      // Se for um resultado válido ele já salva o cnpj na SessionStorage
      if(!result.error){
        setSessionStorage(cnpj);
      } 
      const obj = result;
      // Remove itens do objeto que fazem parte da API, e não do cnpj consultado
      const deleteKeys = ['maps', 'files', 'last_update'];
      deleteKeys.forEach((el) => delete obj[el]);
      Object.keys(obj).forEach((item) => {
        if(obj[item] === null || obj[item].length === 0) {
          delete obj[item];
        }
      });
      return obj;
    })
    .catch((error) => console.log(error));
};

export default fetchApi;
