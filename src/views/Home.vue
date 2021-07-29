<template>
  <div class="home-app">
    <h2>Insira um CNPJ Válido</h2>
    <input type="text" :value="cnpjInput" maxlength="18" minlength="14" @keyup="handleInput" placeholder="88.415.345/0001-57" />
    <p>Esse CNPJ é válido? <strong>{{isCnpjValid}}</strong></p>
    <button class="btn main-colors" @click="handleRedirect" :disabled="!validForSearch">Consultar</button>
  </div>
  <SearchHistory />
</template>

<script>
import { validate }  from 'cnpj';
import SearchHistory from '../components/SearchHistory.vue';

export default {
  data: function() {
    return {
      validForSearch: false,
      isCnpjValid: 'Não',
      cnpjInput: '',
    }
  },
  components: {
    SearchHistory
  },
  methods: {
    handleInput({target: { value }}) {
      this.cnpjInput = value;
      const check = validate(this.cnpjInput)
      if(check) {
        this.isCnpjValid = 'Sim'
        this.validForSearch = true;
      } else {
        this.isCnpjValid = 'Não';
        this.validForSearch = false;
      }
    },
    handleRedirect() {
      const cnpj = this.cnpjInput.replace(/[^0-9]/g, '')
      this.$router.push(`/details/${cnpj}`)
    },
  },
}
</script>

<style>
li {
  text-align: left;
}

a {
  text-decoration: none;
  padding: 7px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

input {
  width: 175px;
  height: 20px;
  outline-color: #42b983;
}

.home-app {
  background-color: #fafafa;
  width: 350px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.main-colors {
  color: #42b983;
  background-color: aliceblue;
  border-radius: 5px;
}

.main-colors:active {
  color: #42b983;
}

.btn {
  text-decoration: none;
  padding: 7px;
  font-weight: 600;
  width: 150px;
}

.btn:disabled {
  opacity: 40%;
}
</style>
