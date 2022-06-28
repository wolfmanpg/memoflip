import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      currentScore: 0,
      currentLevel: 1,
      finalLevel: 3,
      isGameFinished: false,
      statistics: []
    };
  },
  mutations,
  actions,
  getters
};
