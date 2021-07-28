<template>
  <div>
    <h1>Detalhes sobre {{stateCnpj}}</h1>
    <h2 v-if="isLoading">Loading...</h2>
    <div class="main-info" v-else>
      <ul>
        <li :key="index" v-for="(value, key, index) in response">
          <template v-if="typeof(value) === 'string' || typeof(value) === 'number'">
            {{key}} : {{value}}
          </template>
          <template v-else-if="Array.isArray(value)">
            {{key}}: 
            <ul>
              <li :key="index" v-for="(valueArray, index) in value">
                {{valueArray}}  OBJVALUE
              </li>
            </ul>
          </template>
          <template v-else-if="typeof(value) === 'object'">
            {{key}}:
            <ul :key="index" v-for="(valueKey, index) in value">
              {{valueKey}}:
              <!-- <span :key="index" v-for="(objValue, keyValue, index) in value">
                 {{keyValue}} : {{objValue}}
              </span> -->
            </ul>
            <hr>
          </template>
          <template v-else>
            {{key}}:
            <ul>
              <li :key="index" v-for="(valueArray, index) in value">
                {{valueArray}}
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
.main-info {
  min-width: 100vw;
  max-width: 70vw;
  margin: auto;
}

.main-info li {
  margin: 10px;
}

</style>
