export default {
  getCurrentLevel(state) {
    return state.currentLevel;
  },
  getFinalLevel(state) {
    return state.finalLevel;
  },
  getCurrentScore(state) {
    return state.currentScore;
  },
  getIsGameFinished(state) {
    return state.isGameFinished;
  },
  getStatistics(state) {
    return state.statistics;
  },
  // isCoach(_, getters, _2, rootGetters) {
  //   const coaches = getters.coaches;
  //   const userId = rootGetters.userId;
  //   return coaches.some(coach => coach.id === userId);
  // },
  // shouldUpdate(state) {
  //   const lastFetch = state.lastFetch;
  //   if (!lastFetch) {
  //     return true;
  //   }
  //   const currentTimeStamp = new Date().getTime();
  //   return (currentTimeStamp - lastFetch) / 1000 > 60;
  // }
};