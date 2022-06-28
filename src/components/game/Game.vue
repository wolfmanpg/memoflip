<template>
  <nav>
    <div class="container mx-auto">
      <div class="flex justify-between pt-10 pb-10">
        <h2 v-if="!isGameFinished">
          <base-button title="Quit Game" @click="resetGame"></base-button>
        </h2>

        <h2
          class="text-primary font-bold text-5xl"
          v-if="!isGameFinished"
        >
          Level {{ currentLevel }}
        </h2>

        <h3
          class="text-primary text-right text-3xl"
          v-if="!isGameFinished"
        >
          Score : <span class="font-bold">{{ gameScore }}</span>
        </h3>
      </div>
    </div>
  </nav>

  <div class="mt-12 mb-12">
    <Transition name="fade">
      <div v-if="!isLevelFinished && startNextLevel">
        <!-- Game Flipping Cards go there -->
        <Cards
          :level="currentLevel"
          :totalCards="totalLevelCards"
          @level-finished="finishLevel"
        ></Cards>
      </div>
    </Transition>

    <Transition name="finish-level">
      <div v-if="isLevelFinished">
        <div class="container mx-auto" v-if="!isGameFinished">
          <p class="text-center font-bold text-2xl mt-3 mb-6">
            You have finished the level !
          </p>
          <base-button title="Next Level" @click="nextLevel"></base-button>
        </div>
        <div v-else>
          <div class="grid place-items-center">
            <base-card>
              <div class="flex flex-col mx-auto p-2">
                <div class="text-center font-bold text-xl mt-3 mb-6">
                  <p>Congratulations, you have finished the game !</p>
                  <p class="mt-2">
                    Final Score : <span class="text-2xl">{{ gameScore }}</span>
                  </p>
                </div>
                <div class="flex justify-center">
                  <base-button
                    title="Play Again"
                    @click="playAgain"
                  ></base-button>
                 <base-button
                    title="Main Menu"
                    :isLink="true"
                    url="/"
                  ></base-button>
                </div>
              </div>
            </base-card>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Cards from "./Cards";

export default {
  components: {
    Cards,
  },
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const gameCardsByLevel = ref([
      {
        level: 1,
        totalCards: 16,
        cardsPerRow: 4,
      },
      {
        level: 2,
        totalCards: 20,
        cardsPerRow: 5,
      },
      {
        level: 3,
        totalCards: 24,
        cardsPerRow: 6,
      },
    ]);

    const isLevelFinished = ref(false);
    const startNextLevel = ref(true);
    const currentLevel = ref($store.getters["game/getCurrentLevel"]);
    const totalLevelCards = ref(
      gameCardsByLevel.value[currentLevel.value - 1].totalCards
    );

    const isGameFinished = ref($store.getters["game/getIsGameFinished"]);
    const gameScore = ref($store.getters["game/getCurrentScore"]);

    return {
      isLevelFinished,
      currentLevel,
      isGameFinished,
      totalLevelCards,
      gameScore,
      startNextLevel,

      finishLevel(levelScore) {
        $store.dispatch("game/updateLevel").then(() => {
          currentLevel.value = $store.getters["game/getCurrentLevel"];

          isLevelFinished.value = true;
          startNextLevel.value = false;

          isGameFinished.value = $store.getters["game/getIsGameFinished"];
          gameScore.value = $store.getters["game/getCurrentScore"];
        });

        $store.dispatch("game/updateScore", levelScore);
      },

      nextLevel() {
        isLevelFinished.value = false;
        totalLevelCards.value =
          gameCardsByLevel.value[currentLevel.value - 1].totalCards;

        setTimeout(() => {
          startNextLevel.value = true;
        }, 500);
      },

      resetGame() {
        $store.dispatch("game/quitGame");
        $store.dispatch("game/resetGame");
        $router.push("/");
      },

      playAgain() {
        $store.dispatch("game/resetGame").then(() => {
          currentLevel.value = $store.getters["game/getCurrentLevel"];
          isGameFinished.value = $store.getters["game/getIsGameFinished"];

          gameScore.value = $store.getters["game/getCurrentScore"];
          isLevelFinished.value = false;
          startNextLevel.value = true;
        });
      },
    };
  },
};
</script>

<style>
.fade-enter-active {
  transition: opacity 1s ease-in;
}

.fade-leave-active {
  transition: none;
}

.fade-enter-from {
  opacity: 0;
}

.finish-level-enter-active {
  animation: scale-in 0.5s ease;
}

.finish-level-leave-active {
  animation: scale-in 0.5s reverse;
}

@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
