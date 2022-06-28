import { createRouter, createWebHistory } from 'vue-router';

import Intro from './components/Intro.vue';
import Game from './components/game/Game.vue';
import Statistics from './components/statistics/Statistics.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Intro },
    { path: '/game', component: Game },
    { path: '/statistics', component: Statistics },
    // {
    //   path: '/coaches/:id',
    //   component: CoachDetail,
    //   props: true,
    //   children: [
    //     { path: 'contact', component: ContactCoach } // /coaches/c1/contact
    //   ]
    // },
    // { path: '/register', component: CoachRegistation },
    // { path: '/requests', component: RequestsReceived },
    // { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;