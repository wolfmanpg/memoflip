<template>
  <div class="grid h-screen place-items-center">
    <base-card>
      <page-header>Welcome to Memoflip !</page-header>
      <div class="flex flex-col mx-auto pt-16 pb-10">
        <div class="mt-5">
          <base-button
            :isLink="true"
            url="/game"
            title="Start Game"
          ></base-button>
        </div>
        <div class="mt-5">
          <base-button
            :isLink="true"
            url="/statistics"
            title="Statistics"
          ></base-button>
        </div>
      </div>
    </base-card>
  </div>
</template>
