import Vue from 'vue'
import Vuetify from 'vuetify'
import {
    Ziggy
} from 'backend@/resources/assets/js/ziggy';
import route from 'backend@/vendor/tightenco/ziggy/src/js/route';
import 'vuetify/dist/vuetify.min.css';
import User from '@/components/user';
import App from './App.vue';
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

new Vue({
    el: '#app',
    router: router.getRouter(),
    components: {
        App
    },
    template: '<App/>'
});
