import PokerForm from './components/PokerForm.vue';
import CreateRoom from './components/CreateRoom.vue';
import Home from './components/Home.vue';
import Dashboard from './components/Dashboard.vue';
import SignInUp from './components/SignInUpComponent.vue';

export const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'create', path: '/create', component: CreateRoom },
    { name: 'room', path: '/room/:id', component: PokerForm, meta: {auth : true} },
    { name: 'visited', path: '/dashboard', component: Dashboard },
    { name: 'signInUp', path: '/signin', component: SignInUp, props: (route) => ({ room: route.query.room }) },
];