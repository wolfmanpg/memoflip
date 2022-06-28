<template>
  <div class="grid place-items-center">
    <div class="flex flex-col mx-auto w-1/3">
      <page-header class="mt-20 mb-20">Statistics</page-header>

      <div v-if="statistics.length > 0">
        <h2 class="text-center text-primary text-2xl">Sort By Score</h2>

        <div class="flex flex-row mt-5 mb-5 justify-center text-xl">
          <div>
            <input
              id="descending"
              type="radio"
              value="desc"
              name="sorting"
              v-model="sorting"
              checked
            />
            <label
              for="descending"
              class="ml-3 text-gray-900 dark:text-gray-300"
              >Descending</label
            >
          </div>
          <div class="ml-5">
            <input
              id="ascending"
              type="radio"
              value="asc"
              name="sorting"
              v-model="sorting"
            />
            <label for="ascending" class="ml-3 text-gray-900 dark:text-gray-300"
              >Ascending</label
            >
          </div>
        </div>

        <base-card>
          <div class="pt-7 pb-10 text-2xl">
            <ul>
              <li class="mb-6" v-for="game in statistics" :key="game.id">
                <p class="text-primary font-bold">Game : {{ game.id }}</p>
                <p>Max Level : {{ game.maxLevel }}</p>
                <p>Result : {{ game.victory ? "Win" : "Lose" }}</p>
                <p>
                  Score : <span class="font-bold">{{ game.score }}</span>
                </p>
              </li>
            </ul>
          </div>
        </base-card>
      </div>

      <div v-else>
        <p class="text-center text-2xl">You haven't played any games yet..</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const $store = useStore();

    const sorting = ref("desc");

    const statistics = computed(() => {
      let array = $store.getters["game/getStatistics"];

      //return the sorted array based on the sorting option selected
      if (sorting.value === "asc") {
        return array.sort((prevEl, el) => {
          return prevEl.score - el.score;
        });
      } else {
        return array.sort((prevEl, el) => {
          return el.score - prevEl.score;
        });
      }
    });

    return {
      statistics,
      sorting,
    };
  },
};
</script>
