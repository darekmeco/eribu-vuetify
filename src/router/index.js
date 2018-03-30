import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Media from '@/components/Media';

import _merge from 'lodash/merge';
import _union from 'lodash/union';
Vue.use(Router);
export default {
    routes: [
        {path: '/', name: 'HelloWorld', component: HelloWorld},
        {path: '/media', name: 'media.index', component: Media}
    ],
    unionRoutes(routes) {
        this.routes = _union(this.routes, routes);
        console.log(this.routes);
    },
    getRouter() {
        return new Router({
            routes: this.routes
        });
    },
    router: new Router({
        routes: this.routes
    })
}