<template>
  <div class="hello">
    <h2>Insira um CNPJ Válido</h2>
    <input type="text" :value="cnpjInput" maxlength="18" minlength="14" @keyup="handleInput" placeholder="88.415.345/0001-57" />
    <p>Esse CNPJ é válido? <strong>{{isCnpjValid}}</strong></p>
    <button @click="handleRedirect" :disabled="!validForSearch">Consultar</button>
  </div>
</template>

<script>
import { validate }  from 'cnpj';

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      validForSearch: false,
      isCnpjValid: 'Não',
      cnpjInput: '',
    }
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
h3 {
  margin: 40px 0 0;
}
ul {
  /* list-style-type: none;
  padding: 0; */
}
li {
  text-align: left;
  /* display: inline-block;
  margin: 0 10px; */
}
a {
  color: #42b983;
  text-decoration: none;
  background-color: aliceblue;
  padding: 7px;
  border-radius: 5px;
}
</style>