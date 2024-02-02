<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div
    class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8 w-screen h-screen bg-[--secondary-color]"
  >
    <div class="lg:col-span-10">
      <div class="flex flex-col items-center justify-center">
        <p class="text-base font-semibold text-primary">
          {{ error.statusCode }}
        </p>
        <h1
          class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          ERROR
        </h1>
        <p
          class="mt-6 text-base/7 text-gray-500 dark:text-gray-400 text-center"
        >
          {{ error.statusMessage }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink to="/">
            <Button class="inline-flex items-center"> Go back home</Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
