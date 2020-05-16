import PokerForm from './components/PokerForm.vue';
import CreateRoom from './components/CreateRoom.vue';
import Home from './components/Home.vue';
import Dashboard from './components/Dashboard.vue';

export const routes = [
    { name: 'home', path: '/', component: Home },
    { path: '/create', component: CreateRoom },
    { path: '/room/:id', component: PokerForm },
    { path: '/dashboard', component: Dashboard },
];