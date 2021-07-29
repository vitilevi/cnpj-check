import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Details from '../views/Details.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // configura rota dinâmica para ser possível consultar cnpj diretamente pela url também
  {
    path: '/details/:cnpj',
    name: 'Details',
    component: Details,
    props: true,
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
