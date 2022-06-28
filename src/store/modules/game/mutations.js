export default {
  setScore(state, newScore) {
    state.currentScore = newScore;
  },
  setCurrentLevel(state, currentLevel) {
    state.currentLevel = currentLevel;
  },
  setIsGameFinished(state, isGameFinished) {
    state.isGameFinished = isGameFinished;

    let currentStatistics = state.statistics, id = 1;

    if (currentStatistics.length > 0){
      id = currentStatistics[currentStatistics.length - 1].id + 1;
    }

    if (state.isGameFinished){
      state.statistics.push({
        id,
        score: state.currentScore,
        victory: state.currentLevel >= state.finalLevel,
        maxLevel: state.currentLevel
      })
    }
  },
};