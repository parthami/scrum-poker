import PokerForm  from'./components/PokerForm.vue';
import CreateRoom  from'./components/CreateRoom.vue';
import Home  from'./components/Home.vue';

export const routes = [
    { name: 'home', path: '/', component: Home },
    { path: '/create', component: CreateRoom},
    { path: '/room/:id', component: PokerForm },
];