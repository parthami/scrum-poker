import PokerForm  from'./components/PokerForm.vue';
import CreateRoom  from'./components/CreateRoom.vue';
import Home  from'./components/Home.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/create', component: CreateRoom},
    { path: '/room', component: PokerForm },
];