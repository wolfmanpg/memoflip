<template>
    <button v-if="! isLink"
      type="button"
      class="w-44 text-white bg-primary hover:bg-secondary hover:text-black font-medium rounded-lg text-xl p-5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      {{ title }}
    </button>
    <router-link v-else :to="url">
      <button
        type="button"
        class="w-44 text-white bg-primary hover:bg-secondary hover:text-blackfont-medium rounded-lg text-xl p-5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"

      >
        {{ title }}
      </button>
    </router-link>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    url: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

