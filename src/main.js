import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import { apolloClient } from './config';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueApollo);

new Vue({
  router,
  store,
  apolloProvider: new VueApollo({ defaultClient: apolloClient }),
  render: h => h(App),
}).$mount('#app');
