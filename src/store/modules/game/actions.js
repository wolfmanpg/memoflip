export default {
  updateScore(context, score){
    let newScore = context.getters.getCurrentScore + score;
    context.commit('setScore', newScore);
  },
  updateLevel(context){
    let newLevel = context.getters.getCurrentLevel + 1;
    let finalLevel = context.getters.getFinalLevel;
    
    if (newLevel > finalLevel){
      context.commit('setIsGameFinished', true);
    }
    else{
      context.commit('setCurrentLevel', newLevel);
    }
  },
  quitGame(context){
    context.commit('setIsGameFinished', true);
  },
  resetGame(context){
    context.commit('setIsGameFinished', false);
    context.commit('setScore', 0);
    context.commit('setCurrentLevel', 1);
  }
};
