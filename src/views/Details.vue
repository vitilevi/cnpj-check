<template>
  <div class="details">
    <div id="nav">
      <router-link class="main-colors" to="/">Nova consulta</router-link>
    </div>
    <h1>Detalhes sobre {{stateCnpj}}</h1>
    <h2 v-if="isLoading">Loading...</h2>

    <div class="cnpj-error" v-else-if="response.error === 404 || response.error === 400">
      <h2>CNPJ não encontrado ou inexistente...</h2>
    </div>

    <div class="main-info" v-else>
      <ul class="main-list">
        <li class="list-item" :key="index" v-for="(mainValue, mainKey, index) in response">

          <template v-if="typeof(mainValue) === 'string' || typeof(mainValue) === 'number'">
            <span class="main-key">{{mainKey}}:</span>
            <span class="main-value">{{mainValue}}</span>
          </template>

          <template v-else-if="Array.isArray(mainValue)">
            <span class="second-key">{{mainKey}}:</span>

            <ul class="obj-wrapper" :key="index" v-for="(valueArray, index) in mainValue">
              <li class="obj" :key="index" v-for="(value, key, index) in valueArray">
                
                <span class="second-key">{{key}}:</span>
                <span class="second-value">{{value}}</span>
              </li>
            </ul>
          </template>

          <template v-else>
            <span class="main-key">{{mainKey}}:</span>

            <ul class="obj-wrapper">
              <li class="obj" :key="index" v-for="(objValue, keyValue, index) in mainValue">
                <template v-if="Array.isArray(keyValue)">
                  <span :key="index2" v-for="(value, index2) in keyValue">
                    {{value}}
                  </span>
                </template>
                <template v-else>
                  <span class="second-key">{{keyValue}}:</span>
                  <span>{{objValue}}</span>
                </template>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fetchApi from '../services/fetchCnpjApi';
import { format }  from 'cnpj';

  export default {
    created: function() {
      this.fetchApi();
      this.formatCnpj();
    },

    methods: {
      async fetchApi () {
      const apiResponse = await fetchApi(this.cnpj);
      this.response = apiResponse;
      this.isLoading = false;
      },

      formatCnpj() {
        this.stateCnpj = format(this.cnpj);
      }
    },

    data: function() {
      return {
        response: {},
        stateCnpj: '',
        isLoading: true,
      }
    },

    props: {
      cnpj: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style>
.details {

}
.main-key, 
.second-key {
  display: inline-block;
  margin: 1px 0;
  font-weight: 600;
  text-transform: capitalize;
}
.list-item {
  margin: 4px;
}
.obj-wrapper {
  display: flex;
  list-style: none;
}

.main-info {
  min-width: 1000px;
  max-width: 90vw;
  margin: 15px auto;
  background-color: #f1fafa;
  border-radius: 15px;
  padding: 10px;
  color: #001;
  /* margin: 15px; */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.main-info li {
  margin-right: 10px;
}

span {
  margin: 0 5px;
}

</style>
