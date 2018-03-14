import menu from './menu';
import Users from './components/Users';
import UsersForm from './components/UsersForm';

export default {
    routes: [
        {path: '/users', name: 'users.index', component: Users},
        
        {path: '/users/create', name: 'users.create', component: UsersForm}
        //{path: '/users/edit/:id', name: 'users.edit', component: UsersForm, props: true}
    ],
    menu
}