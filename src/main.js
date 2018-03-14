import Vue from 'vue'
import Vuetify from 'vuetify'
import { Ziggy } from '../../eribu-laravel/resources/assets/js/ziggy';
import route from '../../eribu-laravel/vendor/tightenco/ziggy/src/js/route';
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import User from '@/components/user';
import App from './App'
import router from './router';

window.route = route;
window.Ziggy = Ziggy;

Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});
Vue.config.productionTip = false;

router.unionRoutes(User.routes);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router.getRouter(),
    components: {App},
    template: '<App/>'
});
