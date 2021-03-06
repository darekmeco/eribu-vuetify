import menu from './menu';
import Users from "./components/Users/Users.vue";
import UsersForm from './components/UsersForm/UsersForm.vue';

export default {
    routes: [
        {
            path: '/users',
            name: 'users.index',
            component: Users
        },
        {
            path: '/users/create',
            name: 'users.create',
            component: UsersForm
        }
        //{path: '/users/edit/:id', name: 'users.edit', component: UsersForm, props: true}
    ],
    menu
}
