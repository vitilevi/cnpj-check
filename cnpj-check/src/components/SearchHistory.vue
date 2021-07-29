<template class="home-bg">
  <div class="home-app search-history">
    <h2>Histórico de pesquisa</h2>
    <h3 v-if="sessionStorage.length === 0">Nenhuma busca até o momento..</h3>
    <div class="search-link" v-else  >
      <router-link class="main-colors link" :to="{path: '/details/' + value}" :key="index" v-for="(value, index) in sessionStorage">
        {{value}}
      </router-link>
    </div>
  </div>
</template>

<script>
import { getSessionStorage } from '../services/handleSessionStorage';
  export default {
    data: function() {
      return {
        sessionStorage: ['aoba'],
      }
    },
    mounted() {
      const array = getSessionStorage();
      this.sessionStorage = [...array];
    }
    
  }
</script>

<style>
.search-link {
  margin: 10px auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 20px;
  /* background-color: #fafafa; */
  border-radius: 8px;
}

.link {
  margin-bottom: 10px;
   padding: 10px 0;
}

.search-link a:hover, .seach-history a:active {
  transform: scale(1.05);
}

.search-history {
  margin-top: 20px;
}
</style>