import { createStore } from 'vuex';

import gameModule from './modules/game/index.js';

const store = createStore({
  modules: {
    game: gameModule,
  },
});

export default store;